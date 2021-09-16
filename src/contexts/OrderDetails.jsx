import { createContext, useContext, useState, useMemo, useEffect } from "react";
//usememo ensures context doesn't update any more than needed
import { pricePerItem } from "../constants";

const OrderDetails = createContext(); //want this undefined if not inside a provider

//CUSTOM HOOK!! check to see whether inside a provider or not
export function useOrderDetails() {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error(
      "useOrderDetails must be used within an OrderDetailsProvider"
    );
  }

  return context;
}

//provider will contain state for wrapped components
export function OrderDetailsProvider(props) {
    //maps are used here to map the type of scoop to it's number, and same with toppings
    const [optionCounts, setOptionCounts] = useState({
        scoops: new Map(),
        toppings: new Map(),
    });

    const [totals , setTotals ] = useState({
        scoops: 0,
        toppings: 0,
        grandTotal: 0
    });

    function calculateSubtotal(optionType, optionCounts) {
        let optionCount = 0;
        //run through the keys of the maps to 
        for(const count of optionCounts[optionType].values()){
            optionCount += count;
        }
        return optionCount * pricePerItem[optionType];
    }
    //use useEffect to update, no CALCULATE the totals whenever the state of the options changes
    useEffect(() => {
        const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
        const toppingsSubtotal = calculateSubtotal("toppings", optionCounts);
        const grandTotal = scoopsSubtotal + toppingsSubtotal;
        setTotals({
            scoops: scoopsSubtotal,
            toppings: toppingsSubtotal,
            grandTotal//shortcut for both var name and 
        });
    }, [optionCounts]);

    const value = useMemo(() => {
        //function to update the state - it will be passed to the provider so it can be used in the children
        function updateItemCount(itemName, newItemCount, optionType) {
            //grab old state
            const newOptionCounts = { ...optionCounts };

            //update option count for this item with it's new value:
            const optionCountsMap = optionCounts[optionType];
            optionCountsMap.set(itemName, parseInt(newItemCount));
            //update the state
            setOptionCounts(newOptionCounts);
        }
        //getter: object containing option counts for scoops and toppings, subtotals and totals
        //setter: updateOptionCounts. totals and subtotals calculated when scoops or toppings update, accomplished with updateItemCount function
        return [{ ...optionCounts, totals }, updateItemCount];//return array of getters and setters 
    }, [optionCounts, totals]);
    return <OrderDetails.Provider value={value} {...props} />
}
