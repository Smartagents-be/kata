package be.smartagents.kata.java.step2.domain;

/**
 * One overdue loan, as much of it as the fee rules care about.
 *
 * @param itemId      catalogue id of the borrowed item
 * @param media       what kind of thing it is
 * @param tier        the borrowing member's tier
 * @param daysOverdue how many days past the due date, never negative
 * @param renewed     whether the loan had already been renewed once
 * @param lost        whether the item has been declared lost rather than merely late
 */
public record Loan(
    String itemId,
    MediaType media,
    MemberTier tier,
    int daysOverdue,
    boolean renewed,
    boolean lost) {}
