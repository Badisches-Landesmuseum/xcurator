// N.B! Mongo execute scripts in alphabetical order.

use artefact;

// Required for mongoimport upsertFields
// db.artefact.createIndex(
//   {
//     "sourceInfo.id": 1
//   },
// )
