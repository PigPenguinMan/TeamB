const initialState = {
    measuresData : [
    ]
}
function measures(state = initialState, action){
    switch(action.type) {
        case "addMeasure" :
            const newMeasure = {...action.payload}
            const newMeasureArr = state.measuresData.concat(newMeasure);
            return {...state, measuresData:newMeasureArr}
        default:
            return state
    }
}
export const addMeasure =(measures)=> ({type:"addMeasure", payload:measures});

export default measures;