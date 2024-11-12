import Register from "@/components/forms/register";


export default function Login(
    {
        searchParams
    } : {
        searchParams: { [key: string]: string | string[] | undefined }
    }
) {

    const token = searchParams.code as string

    return(
        <div>
            <Register operation={!token ? "login" : "reset-password"} token={token}/>
        </div>
    )
}
