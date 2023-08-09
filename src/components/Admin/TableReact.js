import React from 'react';
import {useTable} from 'react-table'
const TableReact = ({columns,data}) => {
 // Create a state
const [filterInput, setFilterInput] = React.useState("");

    const tableInstance = useTable({ columns, data })
 
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      setFilter, 
    } = tableInstance       
 
// Update the state when input changes
const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setFilter("show.name", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setFilterInput(value);
};

// Input element

 return (
<>
<input
  value={filterInput}
  onChange={handleFilterChange}
  placeholder={"Search name"}
/>
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
    <thead>
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <th
              {...column.getHeaderProps()}
              style={{
                borderBottom: 'solid 3px red',
                background: 'aliceblue',
                color: 'black',
                fontWeight: 'bold',
              }}
            >
              {column.render('Header')}
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody {...getTableBodyProps()}>
      {rows.map(row => {
        prepareRow(row)
        return (
          <tr {...row.getRowProps()}>
            {row.cells.map(cell => {
              return (
                <td
                  {...cell.getCellProps()}
                  style={{
                    padding: '10px',
                    border: 'solid 1px gray',
                    background: 'papayawhip',
                  }}
                >
                  {cell.render('Cell')}
                </td>
              )
            })}
          </tr>
        )
      })}
    </tbody>
  </table>
  </>
//    // apply the table props
//    <table {...getTableProps()}>
//      <thead>
//        {// Loop over the header rows
//        headerGroups.map(headerGroup => (
//          // Apply the header row props
//          <tr {...headerGroup.getHeaderGroupProps()}>
//            {// Loop over the headers in each row
//            headerGroup.headers.map(column => (
//              // Apply the header cell props
//              <th {...column.getHeaderProps()}>
//                {// Render the header
//                column.render('Header')}
//              </th>
//            ))}
//          </tr>
//        ))}
//      </thead>
//      {/* Apply the table body props */}
//      <tbody {...getTableBodyProps()}>
//        {// Loop over the table rows
//        rows.map(row => {
//          // Prepare the row for display
//          prepareRow(row)
//          return (
//            // Apply the row props
//            <tr {...row.getRowProps()}>
//              {// Loop over the rows cells
//              row.cells.map(cell => {
//                // Apply the cell props
//                return (
//                  <td {...cell.getCellProps()}>
//                    {// Render the cell contents
//                    cell.render('Cell')}
//                  </td>
//                )
//              })}
//            </tr>
//          )
//        })}
//      </tbody>
//    </table>
 )

        
};

export default TableReact;