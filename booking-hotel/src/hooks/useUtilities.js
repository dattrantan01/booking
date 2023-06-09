import { useState } from "react";

export default function useUtilities(unregister = () => {}) {
  const [count, setCount] = useState(1);
  const [utilities, setUtilities] = useState([
    {
      name: `nameUtility0`,
      value: `valueUtility0`,
      index: 0,
    },
  ]);

  const handleAddUtility = () => {
    const utilitiesList = [
      ...utilities,
      {
        name: `nameUtility${utilities.length}`,
        value: `valueUtility${utilities.length}`,
        index: utilities.length,
      },
    ];
    setCount((prev) => prev + 1);
    setUtilities(utilitiesList);
  };

  const handleClearUtility = (utility) => {
    let utilitiesList = [...utilities];
    utilitiesList = utilitiesList.filter((item) => {
      return item.index !== utility.index;
    });
    utilitiesList.map((item, index) => {
      return (item.index = index);
    });
    unregister(`nameUtility${utilitiesList.length}`);
    unregister(`valueUtility${utilitiesList.length}`);
    setUtilities(utilitiesList);
    setCount((prev) => prev - 1);
  };

  return {
    utilities,
    handleAddUtility,
    setUtilities,
    handleClearUtility,
    count,
  };
}
