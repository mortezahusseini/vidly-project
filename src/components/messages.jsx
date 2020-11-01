import React, { useState } from 'react';

import MyInput from './my-input'

const Messages = () => {
    let staticMessages = [
        { id: 0, content: 'سلام اصغر' },
        { id: 1, content: 'سلام نیلو' },
        { id: 2, content: 'سلام مری' },
        { id: 3, content: 'سلام اصی' },
        { id: 4, content: 'سلام ممد' },
]
    const [messages, setMessages] = useState(staticMessages)

    // setMessages(staticMessages)
    const addMessageHandler = value => {
        let newMessages = [...messages]
        newMessages.push({id: 14, content: value})
        setMessages(newMessages)
        console.log(messages);
    }

    return ( 
        <div>
            { messages.map(message => <div key={message.id} className="my-3 p-3 w-100">
                { message.content }
                 </div>) 
             }
             <MyInput addMessage={ addMessageHandler } newMessage="" />
        </div>
     );
}
 
export default Messages;