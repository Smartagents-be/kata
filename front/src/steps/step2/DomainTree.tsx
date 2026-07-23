import { FileTree, type TreeNode } from './FileTree'

/**
 * One domain of a fictional articles service, laid out the way domain-driven design and ports and
 * adapters leave it on disk, inside the four Maven modules a platform gives every domain. It sits
 * inside the prose of the `engineering` unit, at the `data-figure="domain-tree"` slot its HTML
 * leaves.
 *
 * Two things are being drawn at once. The outer half is the module skeleton, identical for every
 * domain and therefore worth scaffolding: a BOM, the four modules, the `.claude` symlink, and the
 * entry in the root `pom.xml`. The inner half is the part only this domain has: `domain/` names
 * what it needs and owns the interfaces, `adapter/` implements them, and nothing under `adapter/`
 * is mentioned anywhere above it. `author/` is there so the shape reads as repeatable rather than
 * as one lucky folder.
 *
 * `Article.java` appears twice on purpose. The aggregate lives in the domain module; the class
 * carrying `@SpringBootApplication` is named after the domain, so it lands on the same name one
 * package up in the configuration module. The notes beside them say which is which.
 *
 * Nothing here exists in this repo. It is an example, and the unit text says so.
 */
const TREE: TreeNode = {
  name: '.',
  directory: true,
  note: 'domain-tree.root.note',
  children: [
    { name: 'pom.xml', note: 'domain-tree.root-pom.note' },
    {
      name: 'apps',
      directory: true,
      note: 'domain-tree.apps.note',
      children: [
        {
          name: 'article',
          directory: true,
          note: 'domain-tree.article.note',
          children: [
            { name: 'pom.xml', note: 'domain-tree.domain-bom.note' },
            { name: '.claude', directory: true, note: 'domain-tree.dot-claude.note' },
            {
              name: 'article-domain',
              directory: true,
              note: 'domain-tree.domain-module.note',
              children: [
                { name: 'pom.xml' },
                {
                  name: 'src/main/java/be/smartagents/article',
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
                          name: 'web',
                          directory: true,
                          children: [
                            { name: 'ArticleController.java', note: 'domain-tree.controller.note' },
                            { name: 'ArticleResponse.java' },
                          ],
                        },
                        {
                          name: 'persistence',
                          directory: true,
                          children: [
                            {
                              name: 'JpaArticleRepository.java',
                              note: 'domain-tree.jpa-repository.note',
                            },
                            { name: 'ArticleRow.java', note: 'domain-tree.jpa-row.note' },
                          ],
                        },
                        {
                          name: 'archive',
                          directory: true,
                          children: [
                            { name: 'S3Archive.java', note: 'domain-tree.s3-archive.note' },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: 'article-configuration',
              directory: true,
              note: 'domain-tree.configuration-module.note',
              children: [
                { name: 'pom.xml', note: 'domain-tree.configuration-pom.note' },
                {
                  name: 'src/main/java/be/smartagents/article',
                  directory: true,
                  children: [
                    { name: 'Article.java', note: 'domain-tree.application-class.note' },
                  ],
                },
                {
                  name: 'src/main/resources',
                  directory: true,
                  children: [
                    {
                      name: 'application-submodule.properties',
                      note: 'domain-tree.properties.note',
                    },
                    {
                      name: 'db/changelog/article-master.xml',
                      note: 'domain-tree.changelog.note',
                    },
                  ],
                },
              ],
            },
            {
              name: 'article-bootstrap',
              directory: true,
              note: 'domain-tree.bootstrap-module.note',
              children: [
                { name: 'pom.xml' },
                {
                  name: 'src/main/java/be/smartagents/article/bootstrap',
                  directory: true,
                  children: [{ name: 'ApplicationRunner.java', note: 'domain-tree.runner.note' }],
                },
              ],
            },
            {
              name: 'article-context',
              directory: true,
              note: 'domain-tree.context-module.note',
              children: [{ name: 'pom.xml', note: 'domain-tree.context-pom.note' }],
            },
          ],
        },
        {
          name: 'author',
          directory: true,
          note: 'domain-tree.author.note',
        },
      ],
    },
  ],
}

export function DomainTree() {
  return <FileTree id="domain-tree" root={TREE} />
}
