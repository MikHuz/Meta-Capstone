import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import ReserveATable from './components/ReserveATable.jsx';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { CustomerProvider } from './CustomerContext';

function renderReserveTable(){
    return render(
      <MemoryRouter initialEntries={['/reserve']}>
        <CustomerProvider>
          <Routes>
            <Route path="/reserve" element={<ReserveATable />} />
          </Routes>
        </CustomerProvider>
      </MemoryRouter>
    );

}
describe("Reserve Table Form", () => {
  test("Input Interaction for all fields", () => {
    renderReserveTable()
    //Date input
    const dateInput = screen.getByLabelText(/select date/i);
    expect(dateInput).toBeInTheDocument();
    fireEvent.change(dateInput, { target: { value: "2025-08-06" } });
    expect(dateInput.value).toBe("2025-08-06");

    //Time input
    const timeInput = screen.getByLabelText(/select time/i);
    expect(timeInput).toBeInTheDocument();
    fireEvent.change(timeInput, { target: { value: "10:30" } });
    expect(timeInput.value).toBe("10:30");

    // Guests input (number)
    const guestsInput = screen.getByLabelText(/number of guests/i);
    expect(guestsInput).toBeInTheDocument();
    fireEvent.change(guestsInput, { target: { value: "5" } });
    expect(guestsInput.value).toBe("5");

    // Occasion select
    const occasionSelect = screen.getByLabelText(/occasion/i);
    expect(occasionSelect).toBeInTheDocument();
    fireEvent.change(occasionSelect, { target: { value: "birthday" } });
    expect(occasionSelect.value).toBe("birthday");

    //Seating Preference radio btns
    const indoorRadio = screen.getByLabelText(/indoor/i);
    const outdoorRadio = screen.getByLabelText(/outdoor/i);
    expect(indoorRadio).toBeInTheDocument();
    expect(outdoorRadio).toBeInTheDocument();

    //Select indoor seating
    fireEvent.click(indoorRadio);
    expect(indoorRadio.checked).toBe(true);
    expect(outdoorRadio.checked).toBe(false);

    //Select outdoor seating
    fireEvent.click(outdoorRadio);
    expect(outdoorRadio.checked).toBe(true);
    expect(indoorRadio.checked).toBe(false);

    //test that button exists
    const submitButton = screen.getByText("Select Table")
    expect(submitButton).toBeInTheDocument();
  });
  test ("Submit Button disabled functionality",()=>{

  })
});
describe ("Customer Details Form,", ()=>{
    test("Input Interaction for all fields",()=>{

    })
})