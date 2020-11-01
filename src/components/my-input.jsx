
const MyInput = ({addMessage, newMessage}) => {

    const changeHandler = event => {
        event.preventDefault();
        newMessage = event.target.value
    }

    const addMessageHandler = () => {
        addMessage(newMessage)
    }
    return ( <div>
        <input onChange={changeHandler} type="text" /> 
    <button type="button" onClick={() => addMessage(newMessage)}> addMessage </button>
    </div> );
}
 
export default MyInput;