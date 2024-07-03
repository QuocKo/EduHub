import React from "react";
import PropTypes from "prop-types"; // Import PropTypes

export const DefaultColumnFilter = ({ column: { filterValue, setFilter } }) => {
  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Search ...`}
      className="local-filter"
    />
  );
};

DefaultColumnFilter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func.isRequired,
  }).isRequired,
};

export const GlobalFilter = ({ filterValue, setFilter }) => {
  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Search Globally...`}
      className="global-filter"
    />
  );
};

GlobalFilter.propTypes = {
  filterValue: PropTypes.string,
  setFilter: PropTypes.func.isRequired,
};

export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}>
      <option value="">Show All</option>
      {options.map((option, i) => {
        if (!option) option = "";
        return option === "" ? (
          <option key={i} value={""}>
            {"Empty"}
          </option>
        ) : (
          <option key={i} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
}

SelectColumnFilter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func.isRequired,
    preFilteredRows: PropTypes.arrayOf(
      PropTypes.shape({
        values: PropTypes.object.isRequired,
      })
    ).isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export function DateRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length
      ? new Date(preFilteredRows[0].values[id])
      : new Date(0);
    let max = preFilteredRows.length
      ? new Date(preFilteredRows[0].values[id])
      : new Date(0);
    preFilteredRows.forEach((row) => {
      const rowDate = new Date(row.values[id]);

      min = rowDate <= min ? rowDate : min;
      max = rowDate >= max ? rowDate : max;
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <div className="input-range">
      <input
        value={filterValue[0] || ""}
        type="text"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [val ? val : undefined, old[1]]);
        }}
        className="local-filter"
        placeholder="Start"
      />
      <span>-</span>
      <input
        value={filterValue[1] || ""}
        type="text"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [old[0], val ? val : undefined]);
        }}
        className="local-filter"
        placeholder="End"
      />
    </div>
  );
}

DateRangeColumnFilter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.arrayOf(PropTypes.string),
    preFilteredRows: PropTypes.arrayOf(
      PropTypes.shape({
        values: PropTypes.object.isRequired,
      })
    ).isRequired,
    setFilter: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export function NumberRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <div>
      <input
        value={filterValue[0] || ""}
        type="number"
        min={0}
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            val ? parseInt(val, 10) : undefined,
            old[1],
          ]);
        }}
        placeholder={`Min (${min})`}
        className="local-filter"
        style={{ marginRight: 10 }}
      />
      <span>-</span>
      <input
        value={filterValue[1] || ""}
        type="number"
        min={0}
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            old[0],
            val ? parseInt(val, 10) : undefined,
          ]);
        }}
        placeholder={`Max (${max})`}
        className="local-filter"
        style={{ marginLeft: 10 }}
      />
    </div>
  );
}

NumberRangeColumnFilter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    preFilteredRows: PropTypes.arrayOf(
      PropTypes.shape({
        values: PropTypes.object.isRequired,
      })
    ).isRequired,
    setFilter: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};
