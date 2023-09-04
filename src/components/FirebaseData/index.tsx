import { app, database, firebaseConfig } from "../../firebase";
import { initializeApp } from "firebase/app";
import axios from "axios";
import { FC } from "react";

export const FirebaseData: FC = () => {
  const app = initializeApp(firebaseConfig);
//   console.log(app.options.databaseURL === firebaseConfig.databaseURL);
//   console.log(database);

//   axios
//     .post(
//       "https://pulsar-a051b-default-rtdb.europe-west1.firebasedatabase.app/plan_data.json?auth=sRB7jdjPFoz38yQ9339pUHK0ID33f8t45K5UiK7Q",
//       {
//         name: { label: "Thermion DXP50" },
//         cecode: { label: "00.11017" },
//         produced: { label: "333", timestamp: 8 },
//         lacks: {
//           label: "467",
//         },
//         inplan: { label: "800" },
//       }
//     )
//     .then(function (response) {
//       console.log(response);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });

axios.get('https://pulsar-a051b-default-rtdb.europe-west1.firebasedatabase.app/plan_data.json?auth=sRB7jdjPFoz38yQ9339pUHK0ID33f8t45K5UiK7Q')
.then((response) => {
  // console.log(response.data)
});

  return <></>;
};
