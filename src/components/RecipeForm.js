import React, { useState, useContext, Fragment } from "react";
import { RecipeContext } from "../contexts/RecipeContext";

const RecipeForm = (props) => {
  
  const { addRecipe } = useContext(RecipeContext);
  const [date, setDate] = useState(props.date ? props.date : '');
  const [title, setTitle] = useState(props.title  ? props.title : '')
  const [description, setDescription] = useState(props.description  ? props.description : '');
  const [currentStep, setCurrentStep] = useState("");
  const [editStep, setEditStep] = useState(false);
  const [steps, setSteps] = useState(props.steps  ? props.steps : []);
  const [counter, setCounter] = useState(0)
  const [time, setTime] = useState('');
  let stepPlaceholder = `Write step ${counter + 1}. Once done, press enter to get to step ${counter + 2}.`
  
  const handleSubmit = e => {
    e.preventDefault(); //prevents page from being refreshed
    addRecipe(date, description, title, steps); //Add steps to context
    setDate("");
    setDescription("");
    setTitle('')
    setSteps([]);
    setCurrentStep('');
    setCounter(0)
  };

  const SectionHead = (label) => {
    return(
      <div className = "row"> 
      <div className = "col-12">
      <div style = {{float: "left", paddingTop: 10, paddingBottom: 10}}><h2>{label}</h2></div>
      </div>
      </div>
    )

  }
  let newSteps;
  
  return (
    <form onSubmit={handleSubmit} style = {{backgroundColor: "#EFEFFF"}}>
      <div className = "col-12">
        <div className="row">
        
        
          <div className="col-9">
            {SectionHead('Title')}
            <textarea className="text_edit"
            name="textarea"
            rows="1"
            cols="5"
            placeholder="Give your recipe a title!"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          </div>
          <div class="col-3">
          {SectionHead('Date')}
            <input
            type="date"
            placeholder="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
          </div>
        </div>
      </div>
        <div className="col-12">
          {SectionHead('Description')}
          <textarea className="text_edit"
          name="textarea"
          rows="4"
          cols="5"
          placeholder="Please describe your marvelous creation..."
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        </div>
        <div className="col-12">
          {/* <div className = "row"> */}
            {SectionHead('Procedure')}
          {/* </div> */}
          {/* <div className = "col-12"> */}
            <ol>
              {steps.map((step, index) => {
                if (index == counter) { 
                  return(//Write some css
                    <div style = {{backgroundColor: "#FFFFCF", overflowWrap: "break-word", cursor: "pointer"}}> 
                      <div style = {{height: 2}}/>
                      <li style = {{textAlign: "left"}} onClick = {() => {setCurrentStep(step); setCounter(index)}}>
                        {step}
                      </li>
                      
                    </div>
                  ) 
                  } else {
                    return(
                      <div style = {{ overflowWrap: "break-word", cursor: "pointer"}}>
                        <div style = {{height: 5}}/>
                        <li style = {{textAlign: "left"}} onClick = {() => {setCurrentStep(step); setCounter(index)}}>
                          {step}
                        </li>
                        

                      </div>
                    )
                  }
              })}
            </ol>
          {/* </div> */}
          
          <textarea className="text_edit"
          name="textarea"
          rows="4"
          cols="5"
          placeholder= {stepPlaceholder}
          value={currentStep}
          onKeyDown={e => {
            if (e.keyCode === 13) {
              if (currentStep.match(/.*\S.*/)) {
                newSteps = steps
                newSteps[counter] = e.target.value.trim()
                setSteps(newSteps)
                setCounter(steps.length)               
              }
              setCurrentStep('')
              console.log(steps)
            }
          }}
          onChange={e => {e.keyCode != 13 && setCurrentStep(e.target.value); currentStep === '\n' && setCurrentStep(e.target.value)}}
        />


        </div>
        <div className = "col-12" style = {{textAlign: "right"}}><h2>Step {counter + 1}</h2></div>
  
      {/* </div> */}
      
      {props.button && <input type="submit"  value={props.button} />}
      <div style = {{height: 10}}/>
    </form>
  );
};

export default RecipeForm;
