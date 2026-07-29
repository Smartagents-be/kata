import { FileTree, type TreeNode } from './FileTree'

/**
 * One domain of a fictional articles service, laid out the way domain-driven design and ports and
 * adapters leave it on disk. It sits in the `engineering` unit, at the `data-figure="domain-tree"`
 * slot its HTML leaves.
 *
 * It is an ordinary Maven project and nothing more: one `pom.xml`, one `src/main/java`, one main
 * method. The four-module platform skeleton it drew before (a BOM plus a domain, configuration,
 * bootstrap and context module for every domain) was a shape a student would have to be handed, and
 * it spent the figure's room on scaffolding rather than on the packaging. What carries the lesson
 * is inside `src/`, where a folder is a decision: `domain/` names what it needs and owns the
 * interfaces, `application/` is one class per use case, `adapter/` implements those interfaces, and
 * nothing under `adapter/` is mentioned anywhere above it. `author/` is there so the shape reads as
 * repeatable rather than as one lucky folder, which is also why a domain is a package here and not
 * a module: the next one costs a folder.
 *
 * `adapter/` splits by direction before it splits by technology: `incoming/` is what calls the
 * domain, `outgoing/` is what the domain calls out to through a port it wrote itself. That is the
 * driving and driven side of ports and adapters, and it is the level a reader sorts by first, which
 * is why the technology sits under it and not the other way round. Below that the folders are
 * written compound (`web/rest`, `persistence/postgres`) rather than as two rows each: the split
 * that carries the figure is the first one, and drawing four more levels of indentation buys
 * nothing but width on a phone. The package prefixes are compound for the same reason.
 *
 * `src/test/java` is drawn, and as two files rather than an empty folder. Tests mirroring the
 * package they cover is this repo's own rule, so the example keeps it.
 *
 * Nothing here exists in this repo. It is an example.
 */
const TREE: TreeNode = {
  name: '.',
  directory: true,
  note: 'domain-tree.root.note',
  children: [
    { name: 'pom.xml', note: 'domain-tree.root-pom.note' },
    {
      name: 'src/main/java/be/smartagents',
      directory: true,
      children: [
        { name: 'ArticleApplication.java', note: 'domain-tree.application-class.note' },
        {
          name: 'article',
          directory: true,
          note: 'domain-tree.article.note',
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
                      name: 'web/rest',
                      directory: true,
                      children: [
                        { name: 'ArticleController.java', note: 'domain-tree.controller.note' },
                        { name: 'ArticleResponse.java' },
                      ],
                    },
                  ],
                },
                {
                  name: 'outgoing',
                  directory: true,
                  note: 'domain-tree.outgoing.note',
                  children: [
                    {
                      name: 'persistence/postgres',
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
                      name: 'archive/s3',
                      directory: true,
                      children: [{ name: 'S3Archive.java', note: 'domain-tree.s3-archive.note' }],
                    },
                  ],
                },
              ],
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
    {
      name: 'src/main/resources',
      directory: true,
      children: [
        { name: 'application.properties', note: 'domain-tree.properties.note' },
        { name: 'db/changelog/article-master.xml', note: 'domain-tree.changelog.note' },
      ],
    },
    {
      name: 'src/test/java/be/smartagents/article',
      directory: true,
      note: 'domain-tree.test.note',
      children: [
        { name: 'domain/ArticleTest.java' },
        { name: 'application/PublishArticleTest.java' },
      ],
    },
  ],
}

export function DomainTree() {
  return <FileTree id="domain-tree" root={TREE} />
}
