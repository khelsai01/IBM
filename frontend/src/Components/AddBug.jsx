import  { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addBug } from '../Redux/action';

const AddBug = () => {
    const dispatch = useDispatch();

    
    const [title,setTitle] = useState("")
    const [avatar,setAvatar] = useState("")
    const [description,setDescription] = useState("")
    const [source,setSource] = useState("")
    const [severity,setSeverity] = useState("")
    
    
    const handleAdd = async(e)=>{
    
      e.preventDefault()
      const newData ={
        title,
        avatar,
        description,
        source,
        severity

      }
    
    
   try {
    await dispatch(addBug(newData))
    
    alert("New Bug Add Successful on store")
   } catch (error) {
    console.log(error)
   }
    }
        return (
            <div className='w-md'>
                <form className='w-sm m-auto' >
                    <div>
    
                        <label>title of Bug :-
                            <input type='text' placeholder='title of Bug' value={title} onChange={(e)=>setTitle(e.target.value)} />
                        </label> 
                    </div>
                        <br />
                    
                    <div>
                        <label>avatar of Bug :-
                            <input  type='text' placeholder="avatar of Bug" value={avatar} onChange={(e)=>setAvatar(e.target.value)} />
                        </label>
                    </div>
                        <br />
                    <div>
                        <label>source of Bug :-
                            <input  type='text' placeholder='source of Bug' value={source} onChange={(e)=>setSource(e.target.value)}  />
                        </label>
                    </div>
                        <br />
    
                    <div>
                        <label>Bug severity :-</label>
                        <select style={{ height: "51.8px" ,border: "2px", padding: "0px 12px 0px 12px", gap: "8px", borderColor: "rgba(121, 73, 255, 1)" }} value={ severity} onChange={(e)=>setSeverity(e.target.value)}>
                            <option value="">Select By Severity </option>
                            <option value="Critical">Critical</option>
                            <option value="Major">Major</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>

                        </select>
                    </div>
                  
                    <div>
                        <label>Description of Bug :-
                            <textarea type='text' placeholder='title of Bug' value={description} onChange={(e)=>setDescription(e.target.value)}  />
                        </label>
                    </div>
                    <br/>
                    <div>
    
                    <button onClick={handleAdd} border={"none"}>Add</button>
                    </div>
                </form>
            </div>
        )
    }

export default AddBug