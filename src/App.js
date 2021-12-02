import React from "react";
import { useForm } from "react-hook-form";


export default function Form() {
    const { register, handleSubmit } = useForm();

    return <form onSubmit={
        handleSubmit(data => {
            const url = `http://localhost:3000/query-pur-db?counties=${data.counties}`
            fetch(url, {
                method: "GET",
                mode: "cors"
            })
                .then(response => response.json())
                .then(response => {console.log("response", response)})
                .catch(error => {console.log("error", error)})
        })}>
        <label>Field</label>
        <input name="Counties: " {...register('counties')} />
        <input type="submit" />
    </form>;
}