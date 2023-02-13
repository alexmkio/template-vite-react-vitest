import { useMemo, useState } from 'react';

type Params = {
    revealCount?: number;
    initialCount: number;
    totalCount: number;
};

export const useShowMore = (params: Params) => {
    const {
        revealCount: revealCountParam = Number.MAX_VALUE,
        initialCount,
        totalCount,
    } = params;
    const [pageNumber, setPageNumber] = useState(0);
    const currentIndex = useMemo(() => {
        const revealCount = Math.min(revealCountParam, totalCount);
        return pageNumber > 0
            ? revealCount * pageNumber + initialCount
            : initialCount;
    }, [revealCountParam, pageNumber, totalCount, initialCount]);
    const hasMore = currentIndex < totalCount;
    const showLess = currentIndex > initialCount && currentIndex < totalCount;
    const onClick = () => {
        if (hasMore) {
            // Increment
            setPageNumber(pageNumber + 1);
        } else {
            // Go back to collapsed
            setPageNumber(0);
        }
    };
    const onLessClick = () => {
        if (hasMore) {
            // Increment
            setPageNumber(pageNumber - 1);
        } else {
            // Go back to collapsed
            setPageNumber(0);
        }
    };
    return {
        // Component should call this to increment view
        onClick,
        onLessClick,
        // Are there more items to show?
        hasMore,
        showLess,
        // After the initial items, are there more to show?
        canShowMore: initialCount < totalCount,
        // Run this filter on the list of items
        filter: (_: unknown, index: number) => index < currentIndex,
    };
};
