import React, { useContext } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { StoreContext } from "../../store/store";

function FormBottom({
  newRecipe,
  setNewRecipe,
  tagsSelected,
  setTagsSelected,
  handleChange,
}) {
  const { state } = useContext(StoreContext);

  function handleInstructionsChange(event, index) {
    console.log("uploadRecipe");

    let instructions = [...newRecipe.instructions];
    instructions[index] = event.target.value;
    setNewRecipe({
      ...newRecipe,
      instructions: instructions,
    });
  }

  const addInstructionRow = () => {
    console.log("test");
    let instructions = [...newRecipe.instructions];
    instructions.push("");
    setNewRecipe({
      ...newRecipe,
      instructions: instructions,
    });
  };

  return (
    <div className="form-bottom">
      <div className="input-label-container">
        <label>Method</label>
        <div>
          <div className="method-input-container">
            {newRecipe.instructions.map((instr, index) => {
              return (
                <div className="input-span-container" key={index}>
                  <input
                    className="method-input"
                    type="text"
                    name="instruction"
                    onChange={(event) => handleInstructionsChange(event, index)}
                    // onBlur={handleBlur}
                    value={newRecipe.instructions[index]}
                  />
                  <span className="unit-left">{index + 1 + "."}</span>
                </div>
              );
            })}
          </div>
          <div
            className="add-row-button"
            data-tip="Add a new method step"
            onClick={addInstructionRow}
          >
            <i className="material-icons">add</i>
            More instructions
          </div>
        </div>
      </div>
      <div className="input-label-container">
        <label>Notes</label>
        <textarea
          placeholder="Additional Notes"
          name="notes"
          onChange={handleChange}
          value={newRecipe.notes}
        />
      </div>
      <div className="input-label-container">
        <label>Tags</label>
        <Typeahead
          id="basic-typeahead-example"
          multiple={true}
          allowNew={true}
          onChange={setTagsSelected}
          options={state.userData.tags !== undefined ? state.userData.tags : []}
          placeholder="Select Tags"
          selected={tagsSelected}
        />
      </div>
    </div>
  );
}

export default FormBottom;
