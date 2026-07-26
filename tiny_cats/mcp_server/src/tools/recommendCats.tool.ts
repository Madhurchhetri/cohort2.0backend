import axios from "axios";

export const recommendCatsTool = async(
    kidsFreindly: boolean,
    apartmentFriendly: boolean,
)=>{
    const res = await axios.post("http://localhost:3000/api/cats/recommend",{
        kidsFreindly,
        apartmentFriendly
    });
    return res.data;
}

export const getAllCatsTool = async()=>{
    const res = await axios.get("http://localhost:3000/api/cats");
    return res.data;
}