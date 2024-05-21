import Layout from "@/components/Layout";
import Link from "next/link";
import { useState } from "react";
import styles from "../../styles/Form.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from "@/config/index";
import { useRouter } from "next/router";
import axios from "axios";
import { generateUniqueKey } from "@/shared/helpers";
import moment from "moment";

export default function AddNews(){
    const [values, setValues] = useState({
        name: "",
        detail:"",
        time:"",
        date:"",
    });

    const {name, detail, time, date} = values;

    const router = useRouter();

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const emptyFieldCheck = Object.values(values).some((element) => element === "");
       
        if(emptyFieldCheck){
            toast.error("Please fill all Input Field");
        }
        try{
            const response = await axios.post(`${API_URL}/api/sports`, {
                data: {
                    name: values.name,
                    detail: values.detail,
                    time: values.time,
                    date: values.date,
                    slug: generateUniqueKey(),
                }
            });
            
        }
        catch(error){
            console.log(error);
        }

       
    }

    

    const handleInputChange = (e: any) => {
        const{name, value} = e.target;
        setValues({...values, [name]: value})
    }

    return(
        <Layout title="Add News Sport News">
            <Link href="/news">GO Back</Link>
            <h2>Add Sport News</h2>
            <ToastContainer/>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                        name="name"
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="date">Date</label>
                        <input
                        name="date"
                        type="date"
                        id="date"
                        value={moment(date).format("yyy-MM-DD")}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="time">Time</label>
                        <input
                        name="time"
                        type="text"
                        id="time"
                        value={time}
                        onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div>
                        <label htmlFor="name">Detail</label>
                        <textarea
                        name="detail"
                        id="detail"
                        value={detail}
                        onChange={handleInputChange}
                        />
                    </div>
                <input className="btn" type="submit" value="Add News" />
            </form>
        </Layout>
    )
}