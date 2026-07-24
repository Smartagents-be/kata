package be.smartagents.kata.java.step2.domain;

/**
 * Works out what an overdue loan costs, in cents.
 *
 * <p>This is the method a folder grew fast and nobody read: one pass that decides the daily rate,
 * the grace period, a renewal surcharge, a tier discount and a per-media cap, all inline. It is
 * correct enough to ship and far too branchy to leave. Somewhere above ten branches is a method a
 * reviewer cannot hold in their head, which is the whole point of the ceiling in {@code CLAUDE.md}.
 */
public final class LateFeePolicy {

    private LateFeePolicy() {}

    public static long assess(Loan loan) {
        if (loan.daysOverdue() < 0) {
            throw new IllegalArgumentException("daysOverdue cannot be negative");
        }

        if (loan.lost()) {
            long replacement;
            if (loan.media() == MediaType.BOOK) {
                replacement = 2500;
            } else if (loan.media() == MediaType.DVD) {
                replacement = 3000;
            } else if (loan.media() == MediaType.REFERENCE) {
                replacement = 8000;
            } else {
                replacement = 12000;
            }
            return replacement + 500;
        }

        long dailyRate;
        if (loan.media() == MediaType.BOOK) {
            dailyRate = 25;
        } else if (loan.media() == MediaType.DVD) {
            dailyRate = 100;
        } else if (loan.media() == MediaType.REFERENCE) {
            dailyRate = 200;
        } else {
            dailyRate = 150;
        }

        int grace;
        if (loan.tier() == MemberTier.STAFF) {
            grace = 7;
        } else if (loan.tier() == MemberTier.STUDENT || loan.tier() == MemberTier.SENIOR) {
            grace = 3;
        } else {
            grace = 0;
        }

        int billableDays = loan.daysOverdue() - grace;
        if (billableDays <= 0) {
            return 0;
        }

        long fee = dailyRate * billableDays;

        if (loan.renewed()) {
            fee = fee + (fee / 5);
        }

        if (loan.tier() == MemberTier.STAFF) {
            fee = 0;
        } else if (loan.tier() == MemberTier.STUDENT) {
            fee = fee / 2;
        } else if (loan.tier() == MemberTier.SENIOR) {
            fee = fee - (fee / 4);
        }

        long cap;
        if (loan.media() == MediaType.BOOK) {
            cap = 2000;
        } else if (loan.media() == MediaType.DVD) {
            cap = 2500;
        } else if (loan.media() == MediaType.REFERENCE) {
            cap = 5000;
        } else {
            cap = 4000;
        }

        if (fee > cap) {
            fee = cap;
        }

        return fee;
    }
}
