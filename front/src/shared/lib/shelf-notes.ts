/**
 * The bookseller's note under each copy on `/catalog/shelf`, by position in the response (the
 * first title gets the first note, and so on).
 *
 * **They are keyed by position and never name a title, on purpose.** The 9 titles are load bearing
 * for step 1's workshop board, and a file holding all 9 would be a second copy of what that board
 * grades. So every note describes a physical copy (binding, condition, marks, shipping) and would
 * read as true under any title.
 *
 * They exist to make the page heavy. `ConnectOne` compares reading the titles with `curl` against
 * reading them through a browser, and with a bare list the browser's snapshots were small enough
 * that the two routes barely differed. A page made for people carries far more than the data, and
 * an agent driving a browser reads all of it; these notes are that, visible on screen. They address
 * no reader but a buyer, and never the agent: the same unit teaches prompt injection.
 *
 * English only, like the titles they sit under: they are the shop's data, not the course's prose.
 */
export const SHELF_NOTES: readonly (readonly string[])[] = [
  [
    'Cloth binding in dark green, square and tight, with the spine lettering still bright. The boards show light rubbing at the corners and a faint shelf mark along the bottom edge of the back cover, the kind a book picks up from standing upright on a wooden shelf for years. The text block is clean throughout: no underlining, no notes in the margins, no dog-eared pages. The endpapers carry some light foxing, small brown spots that come from age and damp rather than from use, and they do not reach the text.',
    'A previous owner wrote a name and a date in pencil on the front free endpaper. We have left it there, since removing pencil from old paper does more damage than the mark itself. There is no dust jacket, and as far as we can tell this edition was sold without one. The page edges are slightly toned, which is normal for paper of this age and does not affect reading.',
    'We grade this copy as very good. It ships wrapped in acid-free paper inside a padded envelope, and we add a sheet of card to each side so the corners arrive as they left. Returns are accepted within 14 days if the copy does not match this description.',
  ],
  [
    'Paperback, first printing, with the original illustrated cover. The cover has a soft vertical crease along the spine, from being read once and opened flat, and a small sticker residue on the back where a price label was removed by a previous seller. The colours on the front have faded a little on the side that faced a window. The spine is unbroken apart from that one crease, so the book still closes flat.',
    'Inside, the pages are bright for a paperback of this age. There is a short inscription on the title page, a few words of dedication in blue ink, signed with initials only. We do not know who wrote it. A bookmark from a shop that no longer exists was tucked in at page 112, and we have left it in the book, since several buyers have told us they like finding these.',
    'We grade this copy as good. Paperbacks ship in a rigid mailer so the corners are not bent in transit. If you are buying it as a gift, mention it in the order and we will leave out the packing slip with the price on it.',
  ],
  [
    'Hardcover with dust jacket, both in very good condition. The jacket is protected by a clear archival sleeve that we fitted when the book came in, and it shows only a small closed tear at the top of the spine, about 1 centimetre long, repaired from the inside with archival tape. The boards underneath are clean, the gilt on the spine is bright, and the top edge is stained a dark red that has held its colour well.',
    'The binding is sewn rather than glued, which is why the book opens flat and why the pages have stayed tight to the spine. There are no names, no stamps and no notes inside. The only sign of a previous owner is a slight lean to the spine, which tells us the book was stored at an angle for some time. It does not affect the binding, and it straightens out on a full shelf.',
    'We grade this copy as very good. It ships in a box rather than an envelope, with the jacket sleeve left on. Please allow 2 working days for dispatch, as we photograph every boxed copy before it leaves the shop.',
  ],
  [
    'Library edition in a reinforced buckram binding, rebound by the library at some point in its life. It carries the usual library marks: a stamp on the title page, a pocket glued inside the back cover, and a catalogue number written in white ink at the foot of the spine. The pocket still holds the old date card, with 23 stamped return dates on it, the earliest of them faded almost to nothing.',
    'Because it was rebound, the margins are a few millimetres narrower than in the original edition, and the inner margin is tight on some pages, so the book does not open fully flat. The paper is sound and the text is complete. We checked every page, since rebound library copies sometimes lose a leaf or two, and this one has not.',
    'We grade this copy as acceptable, which is a description of how it looks and not of how it reads. Ex-library copies are priced well below the others on this shelf. It ships in a padded envelope, and we do not remove the library marks, since they are part of the copy now.',
  ],
  [
    'Hardcover without dust jacket, in a plain blue cloth binding with the title stamped in black on the spine. The cloth has a few small marks on the front board, possibly from a damp glass, which have dried without lifting the cloth. The corners are slightly bumped, and the head of the spine is a little frayed, which is common on books that were pulled off a shelf by the top of the spine.',
    'The pages are clean and bright, and the book has clearly been read with care. There is one pencilled note in the margin of a page near the middle, a single word followed by a question mark, which we have left because it is light and because it is the only one. The frontispiece is protected by its original tissue guard, which is creased but complete.',
    'We grade this copy as good. It ships wrapped in acid-free paper inside a padded envelope. Customers outside the country should allow up to 10 working days for delivery, and we include a tracking number with every order.',
  ],
  [
    'Trade paperback in large format, with French flaps on both covers. The covers are clean and the flaps are intact, which is rarer than it sounds, since flaps are often used as bookmarks and torn. The spine shows 3 light reading creases. There is a small bump to the bottom corner of the front cover, visible only when you look for it.',
    'The interior is clean apart from a short highlighted passage in yellow on 2 facing pages near the end. The highlighting has not bled through to the other side of the paper. The book includes its original errata slip, loosely inserted, which lists 4 corrections to the printed text and which many copies of this edition have lost.',
    'We grade this copy as good. Large-format paperbacks ship flat in a rigid mailer with a stiffener on each side. If the errata slip matters to you, mention it in your order and we will tape it inside the back cover so it cannot slide out in transit.',
  ],
  [
    'Hardcover in a slipcase, from a numbered edition. The number is written by hand on the limitation page at the front. The slipcase shows some wear along its open edge, where the book has been taken in and out, and a light sunned band along the top. The book itself is in fine condition: the boards are clean, the spine is square, and the ribbon marker is present and unfrayed.',
    'The paper is a heavy cream stock with deckled edges on the fore-edge and the foot, left untrimmed on purpose by the binder. A few of the pages at the back are still joined at the top fold, which tells us that part of the book has never been read. We have not cut them, since an uncut copy is worth more than a cut one, and that decision belongs to the next owner.',
    'We grade this copy as fine in a very good slipcase. It ships in a double box, with the slipcase wrapped separately from the book, and every order of this value is sent insured and signed for on delivery.',
  ],
  [
    'Mass-market paperback, the smallest format on this shelf, in better condition than these usually survive in. The cover is glossy and bright, with one small crease at the top corner of the front. The spine has been read but not cracked, and the cheap paper of this format has toned to a light tan evenly across all pages, without the darker edges that usually come with it.',
    'There are no names or notes inside. A previous owner covered the book in clear plastic film at some point, the kind sold for school books, and it has protected the cover well. We have left the film on, since peeling it off would take the gloss with it. The film has yellowed slightly along the spine.',
    'We grade this copy as good. It is priced as a reading copy rather than a collectable one. It ships in a small padded envelope, and we combine postage when it is ordered together with other copies from this shelf.',
  ],
  [
    'Hardcover with dust jacket, signed by the author on the title page with a short dedication to a named person. We cannot vouch for the dedication beyond saying that the signature matches the others we have seen. The jacket is price-clipped at the front flap, which is common when a book was given as a present, and shows light wear at the head and foot of the spine.',
    'The book underneath is clean and tight. The pages are bright, the binding is sound, and there are no other marks. Inside the front cover there is a newspaper clipping, folded twice, with a review of this book from the year it came out. It has browned, as newsprint does, and it has left a faint shadow on the endpaper where it lay.',
    'We grade this copy as very good in a very good jacket. Signed copies ship in a box, insured and signed for on delivery. We are happy to send extra photographs of the signature before you order: ask through the contact form and mention the copy number.',
  ],
]
