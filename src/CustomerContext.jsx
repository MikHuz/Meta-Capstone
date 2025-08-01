import React, { createContext, useState } from 'react';
export const CustomerContext = createContext();

export function CustomerProvider({ children }) {
  const [customerDetails, setCustomerDetails] = useState({
    table: {
      date: '',
      time: '',
      guests: 1,
      occasion: '',
      seatingPreference: '',
    },
    details: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      requests: '',
    },
    payment: {
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
      confirmationPreference: '',
    },
  });

  // Helper to update nested parts of customerDetails
  function updateTable(newTableData) {
    alert("Inside UpdateTable")
    setCustomerDetails({
      ...customerDetails,
      table: {
        ...customerDetails.table,
        ...newTableData,
      }
    })
  };

  const updateDetails = (newDetailsData) => {
    setCustomerDetails(prev => ({
      ...prev,
      details: {
        ...prev.details,
        ...newDetailsData,
      }
    }));
  };

  const updatePayment = (newPaymentData) => {
    setCustomerDetails(prev => ({
      ...prev,
      payment: {
        ...prev.payment,
        ...newPaymentData,
      }
    }));
  };
  const value = {
    customerDetails,
    updateTable,
    updateDetails,
    updatePayment,
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
}
