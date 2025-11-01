import {useState,useContext} from 'react'
import {noteContextSo} from './Notestate'
import { API_BASE_URL } from '../../../config';



const useSend=()=>{
const  {totalmessages,setTotalmessages,selectedHome, setSelectedHome,isUploading,setIsUploading}=useContext(noteContextSo);
const [messagesCount,setMessageCount]=useState(0);
    const save=async (body)=>{
        const url=`${API_BASE_URL}/host/save`;
        const response=await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(body),
        credentials:"include"
        });
        const res=await response.json();
        return res.new;
    }



    //ToSend And Edit the Home
    var toReturn=selectedHome;
    const toSend = async (body, id) => {
  console.log("Body and id is this ", body, id);

  for (const [key, value] of Object.entries(body)) {
    if (key === "photo" && Array.isArray(value)) {
      const photoObj = value[0];

      for (const [innerKey, innerValue] of Object.entries(photoObj)) {
        if (Array.isArray(innerValue)) {
          // handle arrays like houseVideos, housePhotos
          const uploadedUrls = [];

          for (const item of innerValue) {
            if (typeof item !== "string") {
              const urlTSend = `${API_BASE_URL}/host/getSignatureForEdit`;

              const got = await fetch(urlTSend, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  public_id: item.name,
                  folder: innerKey === "houseVideos" ? "videos" : "images",
                }),
              });

              const { apikey, cloudName, timestamp, signature, public_id, folder } = await got.json();
              console.log("THe value gtot from above ",apikey, cloudName, timestamp, signature, public_id, folder);
              const formData = new FormData();
              formData.append("file", item);
              formData.append("public_id", public_id);
              formData.append("folder", folder);
              formData.append("api_key", apikey);
              formData.append("signature", signature);
              formData.append("timestamp", timestamp);

              const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
              const response = await fetch(uploadUrl, {
                method: "POST",
                body: formData,
              });
              const res = await response.json();
              uploadedUrls.push(res.secure_url);
            } else {
              uploadedUrls.push(item);
            }
          }
          console.log("so teh array i got is ",uploadedUrls);
          // Update photo array field after all uploads complete
          const updatedYes = {
              ...selectedHome,
              photo: [{ ...toReturn.photo[0], [innerKey]: uploadedUrls }],
            };
            toReturn=updatedYes;
          setSelectedHome((prev)=>{
            const updated=updatedYes;
            console.log("updated inside updated is this updateed ",updated);
            return updated;
          });
        } else {
          // handle single file fields (not array)
          if (typeof innerValue !== "string") {
            const urlTSend = `${API_BASE_URL}/host/getSignatureForEdit`;

            const got = await fetch(urlTSend, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                public_id: innerValue.name,
                folder: innerKey,
              }),
            });


            const { apikey, cloudName, timestamp, signature, public_id, folder } = await got.json();
            console.log("THe value gtot from above ",apikey, cloudName, timestamp, signature, public_id, folder);
            const formData = new FormData();
            formData.append("file", innerValue);
            formData.append("public_id", public_id);
            formData.append("folder", folder);
            formData.append("api_key", apikey);
            formData.append("signature", signature);
            formData.append("timestamp", timestamp);

            const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
            const response = await fetch(uploadUrl, {
              method: "POST",
              body: formData,
            });
            const res = await response.json();
            const secure_url = res.secure_url;
            console.log("for ",innerKey," is this ",secure_url);
            const updatedYNo = {
                ...selectedHome,
                photo: [{ ...toReturn.photo[0], [innerKey]: secure_url }],
              };
              toReturn=updatedYNo;
              console.log("secure_url got so far are ",secure_url);
            setSelectedHome((prev)=>{
            const updated=updatedYNo;
            console.log("updated inside updated is this updateed for single ",updated);
            return updated;
          });
          }
        }
      }
    }
  }

  console.log("✅ All uploads done for id:", id);
}
async function ToCall(body, id){
setIsUploading(true); // Start loading
try {
await toSend(body, id);
await new Promise((resolve,reset)=>setTimeout(resolve,20));
console.log("The nEw Home To Send is now ",toReturn);
const uploadUrl = `${API_BASE_URL}/host/editHome/${id}`;
            const response = await fetch(uploadUrl, {
              method: "POST",
              headers:{
                "Content-Type":"application/json"
              },
              body: JSON.stringify({newHome:toReturn,id:id}),
            });
            const res = await response.json();
            setSelectedHome(res.home);
            setIsUploading(false); // End loading
} catch (error) {
    console.error("Upload error:", error);
    setIsUploading(false); // End loading even on error
}
};

    const PersonalFetchAllMEssage=async (Ownername,Owneremail,useremail,role)=>{
      const url=`${API_BASE_URL}/${role}/PersonalFetchAllMEssage`;
      const response=await fetch(url,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify({Ownername:Ownername,Owneremail:Owneremail,useremail:useremail})
      });
      const res=await response.json();
      console.log("Rhis is the whole chat between them ",res.chats);
      
      return res.chats;
    }
    const TOSendToMEssage=async (OwnerDetails,UserDetails,message,role)=>{
            const url=`${API_BASE_URL}/${role}/messageuser`;
            const response=await fetch(url,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({OwnerDetails,UserDetails,message:message,role:role}),
                credentials:"include"
            });
            const res=await response.json();
            console.log(res.msg);
            return res.msg;
    }
    const fetchMessages=async ()=>{
      try {
        const role=localStorage.getItem('role');
        const url=`${API_BASE_URL}/${role}/getMessages`;
        const response=await fetch(url,{
            method:"GET",
            credentials:"include"
        });
        
        // Check response status
        if (!response.ok) {
          console.error('Failed to fetch messages:', response.status);
          if (response.status === 401) {
            console.warn('Not authenticated - please log in');
          }
          setTotalmessages([]);
          setMessageCount(0);
          return;
        }
        
        // Validate content type
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.error('Expected JSON but got:', contentType);
          const text = await response.text();
          console.error('Response:', text.substring(0, 200));
          setTotalmessages([]);
          setMessageCount(0);
          return;
        }
        
        const res = await response.json();
        
        // Check for errors
        if (res.error) {
          console.error('Server error:', res.error);
          setTotalmessages([]);
          setMessageCount(0);
          return;
        }
        
        console.log("THe number si this ", res.counting);
        setTotalmessages(res.list || []);
        setMessageCount(res.counting || 0);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setTotalmessages([]);
        setMessageCount(0);
      }
}
    return {save,toSend,PersonalFetchAllMEssage,TOSendToMEssage,fetchMessages,messagesCount,setMessageCount,ToCall};
}
export default useSend