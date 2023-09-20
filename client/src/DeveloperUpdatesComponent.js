// TODO: @material-ui/core legacy dependencies. Need to force install or --legacy-peer-deps
// import React from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

// const columns = [
//   {
//     id: 'versionDeployed',
//     label: 'Version Deployed',
//   },
//   {
//     id: 'date',
//     label: 'Date',
//   },
//   {
//     id: 'bugOrFeature',
//     label: 'Bug/Fix or Feature',
//   },
// ];

// const data = [
//   {
//     versionDeployed: '1.0',
//     date: '2023-09-20',
//     bugOrFeature: 'Bug fix',
//   },
//   {
//     versionDeployed: '1.1',
//     date: '2023-09-22',
//     bugOrFeature: 'New feature',
//   },
//   // Add more rows as needed
// ];

// const DeveloperUpdatesComponent = () => {
//   return (
//     <div>
//       <h1>Developer Updates</h1>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell key={column.id}>{column.label}</TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.map((row) => (
//               <TableRow key={row.id}>
//                 {columns.map((column) => (
//                   <TableCell key={column.id}>{row[column.id]}</TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default DeveloperUpdatesComponent;
