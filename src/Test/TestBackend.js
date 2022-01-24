import React from "react";
import { useForm } from "react-hook-form";
import SECRETS from "../Secrets/secrets";

export default function TestBackend() {
    const { register, handleSubmit } = useForm();

    return <form onSubmit={
        handleSubmit(data => {
            const url = `${SECRETS.ANTO_BACKEND_SERVER_API}test`
            fetch(url, {
                method: "GET",
                mode: "cors"
            })
                .then(rawResponse => {console.log("TEST: no json", rawResponse.text())})
                .catch(error => {console.log("TEST: error", error)})
        })}>
        <label>Run Test  </label>
        <input name="Test button: " {...register('counties')} />
        <input type="submit" />
    </form>;
}