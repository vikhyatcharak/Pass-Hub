import React from 'react'
import { MdOutlinePostAdd } from "react-icons/md";
import { FaCopy } from "react-icons/fa6";
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';

const UI = () => {
    const [form, setForm] = useState({ site: "", userName: "", pass: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const ref = useRef()
    const passRef = useRef()

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])


    const handleShow = () => {
        const img = ref.current.querySelector("img")
        if (img.src.includes("/hide.jpg")) {
            img.src = "/Pass-Hub/eye.svg"
            passRef.current.type = "password"
        }
        else {
            img.src = "/Pass-Hub/hide.jpg"
            passRef.current.type = "text"
        }
    }
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const savePass = () => {
        if (form.isEditing) {
            const updatedArray = passwordArray.map((item) =>
                item.id === form.edit ? { ...form, isEditing: false } : item
            )

            setPasswordArray(updatedArray)
            localStorage.setItem("passwords", JSON.stringify(updatedArray))
            toast.success('Password Edited!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            const newPassword = { ...form, id: uuidv4() }
            setPasswordArray([...passwordArray, newPassword])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, newPassword]))
            toast.success('Password Saved!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

        setForm({ site: "", userName: "", pass: "" })
    }
    const copyText = (text) => {
        toast.success('Copied to Clipboard', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }
    const handleEdit = (id) => {
        if (form.isEditing) {
            return
        }
        const itemToEdit = passwordArray.find(i => i.id === id)
        if (itemToEdit) {
            setForm({ ...itemToEdit, isEditing: true, edit:id })
        }
    }
    const handleDelete = (id) => {
        let c=confirm("Do you really want to delete?")
        if(c){
            const newArray = passwordArray.filter(i => i.id !== id)
            setPasswordArray(newArray)
            localStorage.setItem("passwords", JSON.stringify(newArray))
            toast.success('Password Deleted', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{ zIndex: 99999, position: "fixed", top: "10px", right: "10px" }}
            />

            <div className="absolute inset-0 -z-10 w-full bg-green-50 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)]">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
            </div>
            <div className="md:w-[75vw] h-[80vh] flex flex-col gap-8 px-14 py-8 mx-auto overflow-y-auto">
                <div className="flex flex-col gap-2 items-center">
                    <div className="logo font-bold sm:text-2xl text-xl">
                        <span className='text-green-800'>&lt;</span>
                        Pass
                        <span className='text-green-800'>Hub/&gt;</span>
                    </div>
                    <p className='sm:text-lg text-base font-semibold text-green-800 '>Your Own Password Manager</p>
                </div>
                <input value={form.site} onChange={handleChange} name='site' type="text" className='text-sm sm:text-base w-full rounded-full p-1 px-4 border border-green-900' placeholder="Enter website's url" />
                <div className="flex gap-8 w-full sm:flex-row flex-col">
                    <input value={form.userName} onChange={handleChange} name='userName' type="text" className='text-xs sm:text-base w-full rounded-full p-1 px-4 border border-green-900' placeholder='Enter username' />
                    <div className='relative w-full flex items-center'>
                        <input value={form.pass} ref={passRef} onChange={handleChange} name='pass' type="password" className='text-xs sm:text-base w-full rounded-full p-1 px-4 border border-green-900' placeholder=' Enter password' />
                        <span ref={ref} onClick={handleShow} className='absolute right-0  px-2 hover:cursor-pointer'><img src="/Pass-Hub/eye.svg" alt="show" className='w-6' /></span>
                    </div>
                </div>
                <button disabled={form.pass.length < 1 || form.site.length < 1 || form.userName.length < 1} onClick={savePass} className='text-white w-fit rounded-full p-2 bg-green-800 flex justify-center mx-auto items-center gap-1 hover:bg-green-600 border-2 border-green-900 disabled:bg-green-950'>
                    <MdOutlinePostAdd className='text-xl' />Save
                </button>
                <div>
                    <h2 className='text-xl font-bold py-2'>Your Passwords</h2>
                    {passwordArray.length == 0 && <div className='px-2'>No Saved Passwords</div>}
                    {passwordArray.length > 0 &&
                        <div className="flex flex-col h-[30vh] overflow-y-auto">
                            <table className="w-full h-fit text-sm text-left ">
                                <thead className="text-xs  uppercase bg-green-700">
                                    <tr>
                                        <th scope="col" className="sm:px-6 sm:py-3 p-1 hover:cursor-pointer text-center">
                                            Site name
                                        </th>
                                        <th scope="col" className="sm:px-6 sm:py-3 p-1 text-center">
                                            UserName
                                        </th>
                                        <th scope="col" className="sm:px-6 sm:py-3 p-1 text-center">
                                            Password
                                        </th>
                                        <th scope="col" className="sm:px-6 sm:py-3 p-1 text-center">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {passwordArray.map((item, index) => {
                                        return <tr key={index} className="bg-green-100 border-b  border-gray-300">
                                            <td scope="row" className="sm:px-6 sm:py-4 p-1 overflow-y-auto font-medium ">
                                                <div className='flex gap-1 items-center justify-center'>
                                                    <a href={item.site} target="_blank">
                                                        {item.site}
                                                    </a>
                                                    <FaCopy className='hover:cursor-pointer' onClick={() => { copyText(item.site) }} />
                                                </div>
                                            </td>
                                            <td className="sm:px-6 sm:py-4 p-1 overflow-y-auto ">
                                                <div className='flex gap-1 items-center justify-center'>
                                                    {item.userName}
                                                    <FaCopy className='hover:cursor-pointer' onClick={() => { copyText(item.userName) }} />
                                                </div>
                                            </td>
                                            <td className="sm:px-6 sm:py-4 p-1 overflow-y-auto ">
                                                <div className='flex gap-1 items-center justify-center'>
                                                    {"*".repeat(item.pass.length)}
                                                    <FaCopy className='hover:cursor-pointer' onClick={() => { copyText(item.pass) }} />
                                                </div>
                                            </td>
                                            <td className="sm:px-6 sm:py-4 p-1 overflow-y-auto ">
                                                <div className='flex gap-2 items-center justify-center'>
                                                    <FaEdit className='hover:cursor-pointer text-lg' onClick={() => { handleEdit(item.id) }} />
                                                    <RiDeleteBin5Fill className='hover:cursor-pointer text-lg' onClick={() => { handleDelete(item.id) }} />
                                                </div>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default UI
