import { FileTree, type TreeNode } from './FileTree'

/**
 * An example repository cut into 1 module per capability, with ports and adapters inside each
 * module. It sits in the `engineering` unit, at the `data-figure="domain-tree"` slot after
 * `engineering.hexagonal-architecture.1`, a section below `VerticalSlices`.
 *
 * **The top level is capabilities, named after what the business does.** `payments` is
 * everything payments need, its screen included, and `invoicing` is the next one in the same shape.
 * Keeping the proof of every payment is part of payments here, which is why the `Archive` port and
 * its S3 adapter sit in `payments`: `HexagonPorts` and
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
 * payments verify`, which `engineering.vertical-slices.2` names), and there is no BOM, no
 * starter and no per-domain configuration module. The shape follows a production repository the
 * owner pointed at, without its Spring Boot starter plumbing. `host` draws no `pom.xml` and no
 * `src/main/java` above its one class, on purpose: both are what every module has, and the rows are
 * worth more to the deck slide's height than to completeness.
 *
 * **Inside a module the layout is the hexagon**: `domain/` is the rules and depends on nothing,
 * `application/` is one class per use case plus the ports those use cases own, `adapter/` implements
 * those ports, and nothing under `adapter/` is mentioned anywhere above it. **The ports sit in
 * `application/` and not in `domain/`** (October 2026, at the owner's asking): that is the functional
 * core and imperative shell split the owner's own course teaches, where the core takes no
 * dependency at all, not even on an interface, and the shell owns the ports it loads and writes
 * through. `HexagonPorts` draws the same thing, with the ports on the outer hexagon. `adapter/` splits by direction
 * before it splits by technology, `incoming/` is what calls the domain and `outgoing/` is what the
 * use cases call out to through a port they wrote themselves. Keep those two rows: `HexagonPorts` takes its
 * column labels from their notes, and `exercises/step2/java` uses the same two folders.
 * Below that the folders are written compound (`web/rest/…`, `persistence/postgres/…`) so the tree
 * stays as tall as the deck slide allows.
 *
 * `src/test/java` is drawn, and as two files rather than an empty folder. Tests mirroring the
 * package they cover is this repo's own rule, so the example keeps it.
 *
 * Nothing here exists in this repo. It is an example, and the caption says so. `exercises/step2/java`
 * has the same layout inside its one module since October 2026 (`domain/`, the port in
 * `application/`, `adapter/incoming/` and `adapter/outgoing/`), but it is 1 Maven module with 1
 * capability, not this multi-module repository.
 */
const TREE: TreeNode = {
  name: '.',
  directory: true,
  note: 'domain-tree.root.note',
  children: [
    { name: 'pom.xml', note: 'domain-tree.root-pom.note' },
    {
      name: 'payments',
      directory: true,
      note: 'domain-tree.module.note',
      children: [
        { name: 'pom.xml', note: 'domain-tree.module-pom.note' },
        { name: 'frontend/payment-form.ts', note: 'domain-tree.frontend.note' },
        {
          name: 'src/main/java/be/smartagents/payments',
          directory: true,
          children: [
            {
              name: 'domain',
              directory: true,
              note: 'domain-tree.domain.note',
              children: [
                { name: 'Payment.java', note: 'domain-tree.payment-java.note' },
                { name: 'Iban.java', note: 'domain-tree.iban.note' },
              ],
            },
            {
              name: 'application',
              directory: true,
              note: 'domain-tree.application.note',
              children: [
                { name: 'RecordPayment.java' },
                { name: 'RefundPayment.java' },
                { name: 'PaymentRepository.java', note: 'domain-tree.repository-port.note' },
                { name: 'Archive.java', note: 'domain-tree.archive-port.note' },
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
                      name: 'web/rest/PaymentController.java',
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
                      name: 'persistence/postgres/JpaPaymentRepository.java',
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
          name: 'src/main/resources/db/changelog/payments.xml',
          note: 'domain-tree.changelog.note',
        },
        {
          name: 'src/test/java/be/smartagents/payments',
          directory: true,
          note: 'domain-tree.test.note',
          children: [
            { name: 'domain/PaymentTest.java' },
            { name: 'application/RecordPaymentTest.java' },
          ],
        },
      ],
    },
    {
      name: 'invoicing',
      directory: true,
      note: 'domain-tree.next-module.note',
    },
    {
      name: 'host',
      directory: true,
      note: 'domain-tree.host.note',
      children: [
        {
          name: 'BillingApplication.java',
          note: 'domain-tree.application-class.note',
        },
      ],
    },
  ],
}

export function DomainTree() {
  return <FileTree id="domain-tree" root={TREE} caption="domain-tree.caption" />
}
