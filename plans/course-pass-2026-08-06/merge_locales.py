#!/usr/bin/env python3
"""Apply per-unit locale patches into a step's en.json / nl.json, line by line.

Unit agents run in parallel and must not both hold the same JSON file open, so each one writes
a patch instead of editing the locale files directly:

    scratchpad/course/patches/<step>/<unit>.json

    {
      "en":       { "key": "value", ... },   # added or replaced in en.json
      "nl":       { "key": "value", ... },   # added or replaced in nl.json
      "removeEn": [ "key", ... ],
      "removeNl": [ "key", ... ],
      "afterEn":  { "newKey": "existingKey" },   # optional placement override
      "afterNl":  { "newKey": "existingKey" }
    }

Keys are the flat dotted keys these files use ("impostor.lead.1"), never nested objects.

These locale files are HAND-MAINTAINED: one key per line, blank lines grouping related keys.
A json.load/json.dump round trip would strip that grouping and produce a diff nobody can read,
so this edits the raw text. A replaced key keeps its line. A new key lands directly after the
existing key it shares the longest dotted prefix with, which puts it in its own group without
anyone having to say so; pass afterEn/afterNl to override that.

Usage:  python3 merge_locales.py <step>            # apply every patch for that step
        python3 merge_locales.py <step> --check    # report what would change, write nothing
"""

import json
import os
import re
import sys
from collections import OrderedDict

ROOT = '/Users/bassarrechia/code/kata-agentic-java'
SCRATCH = os.path.dirname(os.path.abspath(__file__))

KEY_LINE = re.compile(r'^(\s*)"((?:[^"\\]|\\.)*)":\s(.*?)(,?)$')


def encode(value):
    """A JSON string exactly as json.dump(ensure_ascii=False) would write it."""
    return json.dumps(value, ensure_ascii=False)


class LocaleFile:
    def __init__(self, path):
        self.path = path
        with open(path, encoding='utf-8') as fh:
            self.lines = fh.read().split('\n')
        self.dirty = False

    def index(self):
        """key -> line number, rebuilt on demand because insertions move lines."""
        out = OrderedDict()
        for i, line in enumerate(self.lines):
            m = KEY_LINE.match(line)
            if m:
                out[m.group(2)] = i
        return out

    def last_line_of_body(self):
        for i in range(len(self.lines) - 1, -1, -1):
            if self.lines[i].strip() == '}':
                return i
        raise ValueError('no closing brace in %s' % self.path)

    def set(self, key, value, after=None):
        idx = self.index()
        if key in idx:
            i = idx[key]
            m = KEY_LINE.match(self.lines[i])
            new = '%s"%s": %s%s' % (m.group(1), key, encode(value), m.group(4))
            if new != self.lines[i]:
                self.lines[i] = new
                self.dirty = True
                return 'replaced'
            return 'unchanged'

        anchor = after if after in idx else self.longest_prefix_sibling(key, idx)
        text = '  "%s": %s,' % (key, encode(value))
        if anchor is None:
            close = self.last_line_of_body()
            # The last key in the file has no trailing comma; it needs one now.
            for i in range(close - 1, -1, -1):
                m = KEY_LINE.match(self.lines[i])
                if m:
                    if not m.group(4):
                        self.lines[i] += ','
                    self.lines.insert(i + 1, text.rstrip(','))
                    break
        else:
            self.lines.insert(idx[anchor] + 1, text)
        self.dirty = True
        return 'added'

    @staticmethod
    def longest_prefix_sibling(key, idx):
        parts = key.split('.')
        best, best_score = None, 0
        for existing in idx:
            other = existing.split('.')
            score = 0
            for a, b in zip(parts, other):
                if a != b:
                    break
                score += 1
            # Prefer the LAST key at the best depth, so a new .3 lands after .2 not after .1.
            if score >= best_score and score > 0:
                best, best_score = existing, score
        return best

    def remove(self, key):
        idx = self.index()
        if key not in idx:
            return False
        i = idx[key]
        was_last = not (KEY_LINE.match(self.lines[i]) or [None, None, None, None, ''])[4]
        del self.lines[i]
        if was_last:
            for j in range(i - 1, -1, -1):
                m = KEY_LINE.match(self.lines[j])
                if m:
                    if m.group(4):
                        self.lines[j] = self.lines[j][:-1]
                    break
        self.dirty = True
        return True

    def validate(self):
        json.loads('\n'.join(self.lines))

    def save(self):
        self.validate()
        with open(self.path, 'w', encoding='utf-8') as fh:
            fh.write('\n'.join(self.lines))


def main():
    if len(sys.argv) < 2:
        sys.exit('usage: merge_locales.py <step> [--check]')
    step = sys.argv[1]
    check = '--check' in sys.argv

    patch_dir = os.path.join(SCRATCH, 'patches', step)
    if not os.path.isdir(patch_dir):
        sys.exit('no patches for %s at %s' % (step, patch_dir))

    files = {
        lang: LocaleFile(os.path.join(ROOT, 'front/src/steps', step, 'locales/%s.json' % lang))
        for lang in ('en', 'nl')
    }

    tally = {'added': 0, 'replaced': 0, 'unchanged': 0, 'removed': 0}
    conflicts, owners = [], {}

    for name in sorted(os.listdir(patch_dir)):
        if not name.endswith('.json'):
            continue
        with open(os.path.join(patch_dir, name), encoding='utf-8') as fh:
            patch = json.load(fh, object_pairs_hook=OrderedDict)
        unit = name[:-5]

        for lang in ('en', 'nl'):
            placement = patch.get('after' + lang.capitalize()) or {}
            for key, value in (patch.get(lang) or {}).items():
                owner = owners.get((lang, key))
                if owner and owner != unit:
                    conflicts.append('%s:%s written by both %s and %s' % (lang, key, owner, unit))
                owners[(lang, key)] = unit
                tally[files[lang].set(key, value, placement.get(key))] += 1

        for lang, field in (('en', 'removeEn'), ('nl', 'removeNl')):
            for key in (patch.get(field) or []):
                if files[lang].remove(key):
                    tally['removed'] += 1

    for lang in ('en', 'nl'):
        try:
            files[lang].validate()
        except ValueError as exc:
            sys.exit('%s.json would not be valid JSON after patching: %s' % (lang, exc))

    en_keys = set(files['en'].index())
    nl_keys = set(files['nl'].index())
    missing_nl = sorted(en_keys - nl_keys)

    print('step %s: %d added, %d replaced, %d unchanged, %d removed'
          % (step, tally['added'], tally['replaced'], tally['unchanged'], tally['removed']))
    print('en.json %d keys, nl.json %d keys' % (len(en_keys), len(nl_keys)))

    if conflicts:
        print('\nCONFLICTS (two units wrote the same key):')
        for c in conflicts:
            print('  ! %s' % c)
    if missing_nl:
        print('\nEN KEYS WITH NO DUTCH (%d):' % len(missing_nl))
        for k in missing_nl:
            print('  - %s' % k)

    if check:
        print('\n--check: nothing written')
        return
    if conflicts:
        sys.exit('\nrefusing to write while conflicts stand')

    for lang in ('en', 'nl'):
        if files[lang].dirty:
            files[lang].save()
    print('\nwritten.')


if __name__ == '__main__':
    main()
