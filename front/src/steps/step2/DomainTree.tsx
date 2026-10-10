import { FileTree, type TreeNode } from './FileTree'

/**
 * An example repository cut into 1 module per capability, with ports and adapters inside each
 * module. It sits in the `engineering` unit, at the `data-figure="domain-tree"` slot after
 * `engineering.hexagonal-architecture.1`, a section below `VerticalSlices`.
 *
 * **The top level is capabilities, named after what the business does.** `article-publishing` is
 * everything publishing needs, its screen included, and `article-scheduling` is the next one in the
 * same shape. Archiving the previous version of an article is part of publishing here, which is why
 * the `Archive` port and its S3 adapter sit in `article-publishing`: `HexagonPorts` and
 * `hexagonal-architecture.2` both lean on that S3 adapter. They are the two module names
 * `VerticalSlices` puts its brackets under, so the drawing of the slices and this tree of the
 * folders are one argument in two figures: a rename in one is a rename in the other. `host` is the
 * one Spring Boot application, and it does nothing but assemble the modules, which is why the only
 * main method lives there and not in a capability.
 *
 * **This reverses a recorded decision, at the course owner's asking (October 2026).** The tree used
 * to be one ordinary Maven project, because the four-module platform skeleton it drew before that
 * (a BOM plus a domain, configuration, bootstrap and context module for every domain) spent the
 * figure on scaffolding a student would have to be handed. This is not that skeleton. A capability
 * is 1 module with its own `pom.xml`, so it builds and tests on its own (`mvn -pl
 * article-publishing verify`, which `engineering.vertical-slices.2` names), and there is no BOM, no
 * starter and no per-domain configuration module. The shape follows a production repository the
 * owner pointed at, without its Spring Boot starter plumbing. `host` draws no `pom.xml` and no
 * `src/main/java` above its one class, on purpose: both are what every module has, and the rows are
 * worth more to the deck slide's height than to completeness.
 *
 * **Inside a module the layout is the hexagon, unchanged**: `domain/` names what it needs and owns
 * the interfaces, `application/` is one class per use case, `adapter/` implements those interfaces,
 * and nothing under `adapter/` is mentioned anywhere above it. `adapter/` splits by direction
 * before it splits by technology, `incoming/` is what calls the domain and `outgoing/` is what the
 * domain calls out to through a port it wrote itself. Keep those two rows: `HexagonPorts` takes its
 * column labels from their notes, and `WhereWouldItGo` sorts `exercises/step2/java` against them.
 * Below that the folders are written compound (`web/rest/…`, `persistence/postgres/…`) so the tree
 * stays as tall as the deck slide allows.
 *
 * `src/test/java` is drawn, and as two files rather than an empty folder. Tests mirroring the
 * package they cover is this repo's own rule, so the example keeps it.
 *
 * Nothing here exists in this repo. It is an example, and the caption says so: the `TaskCard` under
 * this unit asks the student to sort `exercises/step2/java` against the shape above it, so a reader
 * who took the drawing for a folder in this repository would be sorting one repository against
 * another.
 */
const TREE: TreeNode = {
  name: '.',
  directory: true,
  note: 'domain-tree.root.note',
  children: [
    { name: 'pom.xml', note: 'domain-tree.root-pom.note' },
    {
      name: 'article-publishing',
      directory: true,
      note: 'domain-tree.module.note',
      children: [
        { name: 'pom.xml', note: 'domain-tree.module-pom.note' },
        { name: 'frontend/publish-form.ts', note: 'domain-tree.frontend.note' },
        {
          name: 'src/main/java/be/smartagents/publishing',
          directory: true,
          children: [
            {
              name: 'domain',
              directory: true,
              note: 'domain-tree.domain.note',
              children: [
                { name: 'Article.java', note: 'domain-tree.article-java.note' },
                { name: 'Headline.java', note: 'domain-tree.headline.note' },
                { name: 'ArticleRepository.java', note: 'domain-tree.repository-port.note' },
                { name: 'Archive.java', note: 'domain-tree.archive-port.note' },
              ],
            },
            {
              name: 'application',
              directory: true,
              note: 'domain-tree.application.note',
              children: [
                { name: 'PublishArticle.java' },
                { name: 'RewriteHeadline.java' },
              ],
            },
            {
              name: 'adapter',
              directory: true,
              note: 'domain-tree.adapter.note',
              children: [
                {
                  name: 'incoming',
                  directory: true,
                  note: 'domain-tree.incoming.note',
                  children: [
                    {
                      name: 'web/rest/ArticleController.java',
                      note: 'domain-tree.controller.note',
                    },
                  ],
                },
                {
                  name: 'outgoing',
                  directory: true,
                  note: 'domain-tree.outgoing.note',
                  children: [
                    {
                      name: 'persistence/postgres/JpaArticleRepository.java',
                      note: 'domain-tree.jpa-repository.note',
                    },
                    { name: 'archive/s3/S3Archive.java', note: 'domain-tree.s3-archive.note' },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'src/main/resources/db/changelog/publishing.xml',
          note: 'domain-tree.changelog.note',
        },
        {
          name: 'src/test/java/be/smartagents/publishing',
          directory: true,
          note: 'domain-tree.test.note',
          children: [
            { name: 'domain/ArticleTest.java' },
            { name: 'application/PublishArticleTest.java' },
          ],
        },
      ],
    },
    {
      name: 'article-scheduling',
      directory: true,
      note: 'domain-tree.next-module.note',
    },
    {
      name: 'host',
      directory: true,
      note: 'domain-tree.host.note',
      children: [
        {
          name: 'ArticleApplication.java',
          note: 'domain-tree.application-class.note',
        },
      ],
    },
  ],
}

export function DomainTree() {
  return <FileTree id="domain-tree" root={TREE} caption="domain-tree.caption" />
}
