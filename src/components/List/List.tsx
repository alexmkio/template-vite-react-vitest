import "./List.scss";
import { data } from "../../assets/dataset";
import { Link } from "react-router-dom";
import { useShowMore } from "../../hooks/utils/useShowMore";

function List() {
  const { onClick, onLessClick, hasMore, showLess, filter, canShowMore } =
    useShowMore({
      totalCount: data.length,
      initialCount: 10,
      revealCount: 1000,
    });

  return (
    <ol>
      {data.filter(filter).map((e) => {
        return (
          <Link to={`../dog/${e.id}`} key={e.id}>
            <li>{e.breed}</li>
          </Link>
        );
      })}
      {canShowMore && (
        <div>
          <button onClick={onClick}>
            {hasMore ? "Show More" : "Show Less"}
          </button>
          {showLess && <button onClick={onLessClick}>Show Less</button>}
        </div>
      )}
    </ol>
  );
}

export default List;
