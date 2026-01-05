import React, { useEffect, useState } from 'react';


import { RxCross1 } from 'react-icons/rx';
import Skeleton from '../../loaders/Skeleton';
import toast from 'react-hot-toast';
import useUserContext from '../../../context/UserContext';
import UserService from '../../../service/Userservice';

const DashBord = () => {
    let { globalState, setGlobalState } = useUserContext();
    const [showDetails, setShowDetails] = useState(false);
    const [selected, setSelected] = useState(null);

    console.log(globalState);

    const handelClickOpen = () => {
        setShowDetails(true);
    };

    const handelClickClose = () => {
        setShowDetails(false);
    };

    const handelSelected = (ele) => {
        setSelected(ele);
    };

    const renoveHandelSelected = () => {
        setSelected(null);
    };

    const handelApplyClick = (id) => {
        let payload = {
            companyId: id
        };

        (async () => {
            let data = await UserService.applyAllCompanies(payload, globalState.token);
            if (data.status == "200") {
                toast.success("Applied successfully");
                setGlobalState((preVal) => ({
                    ...preVal,
                    user: { ...preVal.user, appliedCompanies: [...preVal.user.appliedCompanies, selected] }
                }));
            }
        })();
    };

    useEffect(() => {
        (async () => {
            setGlobalState((preVal) => ({ ...preVal, isLoading: true }));
            try {
                let { data, status } = await UserService.getAllCompanies();
                if (status == "200") {
                    setGlobalState((preVal) => ({ ...preVal, companies: data.companies, isLoading: false }));
                } else {
                    setGlobalState((preVal) => ({ ...preVal, isLoading: false }));
                }
            } catch (error) {
                console.log(error);
                setGlobalState((preVal) => ({ ...preVal, isLoading: false }));
            }
        })();
    }, []);

    return (
        <>
            <div className={`flex gap-10 flex-wrap size-full p-20 ${showDetails ? "flex-col" : ""}`}>
                {
                    globalState.isLoading ? (
                        <>
                            <Skeleton /><Skeleton />
                            <Skeleton /><Skeleton />
                        </>
                    ) : (
                        globalState.companies.map((ele) => (
                            <div key={ele._id} className='h-[280px] w-[400px] min-w-[400px] max-sm:min-w-0 max-sm:w-full max-sm:h-[360px] bg-white rounded-2xl shadow-md p-5 relative'>
                                {/* Applied Flag Logic can be uncommented here if needed */}
                                
                                <div className='text-2xl font-bold'>
                                    <span>{ele.companyName}</span>
                                </div>

                                <div className='flex gap-2 overflow-x-scroll'>
                                    {ele.companyLocation.map((el) => (
                                        <span key={el} className='bg-sky-50 p-1.5 text-sm rounded-xl text-blue-400'>{el}</span>
                                    ))}
                                </div>

                                <div className='flex gap-2 overflow-x-scroll mt-2'>
                                    {ele.requiredSkills.map((el) => (
                                        <span key={el} className='bg-lime-50 p-1.5 text-sm rounded-xl text-lime-800'>{el}</span>
                                    ))}
                                </div>

                                <div className='w-full flex gap-1 max-sm:flex-col mt-4'>
                                    <div className='grow flex items-center font-bold'>
                                        <span className='pr-1'>CTC : </span>
                                        <span>{ele.CTC}</span>
                                    </div>
                                </div>

                                <div className='grow font-bold max-sm:flex max-sm:flex-col'>
                                    <span>Last Date : </span>
                                    <span className='text-red-500'>
                                        {ele.applicationDeadline.split("T")[0].split("-").reverse().join("-")}
                                    </span>
                                </div>

                                <div className='w-full h-10 bg-slate-800 rounded-2xl mt-4'>
                                    <button 
                                        className='size-full flex justify-center items-center text-white font-bold'
                                        onClick={() => {
                                            handelClickOpen();
                                            handelSelected(ele);
                                        }}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>

            {selected && (
                <div className={`h-full w-175 bg-white shadow-2xl p-10 overflow-y-scroll fixed ${showDetails ? "right-0" : "-right-175"} duration-100 top-0 transition-all`}>
                    <div className='w-full relative' onClick={() => {
                        handelClickClose();
                        renoveHandelSelected();
                    }}>
                        <RxCross1 className='absolute right-5 text-2xl text-red-500 top-5 cursor-pointer' />
                    </div>

                    <h1 className='text-3xl font-bold text-slate-800 mb-5'>
                        {selected.companyName}
                    </h1>

                    <div className='mb-4'>
                        <p className='text-lg font-semibold text-slate-700'>CTC: 
                            <span className='text-blue-600 ml-2'>{selected.CTC}</span>
                        </p>
                        <p className='text-lg font-semibold text-slate-700'>
                            Last Date: 
                            <span className='text-red-600 ml-2'>
                                {selected.applicationDeadline.split("T")[0].split("-").reverse().join("-")}
                            </span>
                        </p>
                    </div>

                    <hr className='my-4' />

                    <h2 className='text-xl font-semibold text-slate-900 mb-2'>Locations</h2>
                    <div className='flex flex-wrap gap-2 mb-4'>
                        {selected.companyLocation.map((loc) => (
                            <span key={loc} className='bg-blue-50 text-blue-700 p-2 rounded-xl text-sm'>{loc}</span>
                        ))}
                    </div>

                    <h2 className='text-xl font-semibold text-slate-900 mb-2'>Required Skills</h2>
                    <div className='flex flex-wrap gap-2 mb-4'>
                        {selected.requiredSkills.map((skill) => (
                            <span key={skill} className='bg-lime-50 text-lime-700 p-2 rounded-xl text-sm'>{skill}</span>
                        ))}
                    </div>

                    <h2 className='text-xl font-semibold text-slate-900 mb-2'>Job Functions</h2>
                    <ul className='list-disc ml-5 text-slate-700 mb-4'>
                        {selected.jobFunctions.map((func) => (
                            <li key={func}>{func}</li>
                        ))}
                    </ul>

                    <h2 className='text-xl font-semibold text-slate-900 mb-2'>Role Overview</h2>
                    <ul className='list-disc ml-5 text-slate-700 mb-4'>
                        {selected.roleOverview.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>

                    <h2 className='text-xl font-semibold text-slate-900 mb-2'>Eligibility Criteria</h2>
                    <ul className='list-disc ml-5 text-slate-700 mb-4'>
                        {selected.eligibilityCriteria.map((el) => (
                            <li key={el}>{el}</li>
                        ))}
                    </ul>

                    <h2 className='text-xl font-semibold text-slate-900 mb-3'>Useful Links</h2>
                    <div className='flex flex-col gap-3'>
                        <a href={selected.companyWebsite} target='_blank' className='text-blue-600 underline'>Company Website</a>
                        <a href={selected.jobDescriptionLink} target='_blank' className='text-blue-600 underline'>Job Description</a>
                        <a href={selected.brochureLink} target='_blank' className='text-blue-600 underline'>Brochure</a>
                    </div>

                    <div className='mt-6 pt-4 border-t border-slate-100 flex justify-end'>
                        <button 
                            className='rounded-full px-4 py-2 text-sm font-medium shadow-sm bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98] transition-all'
                            onClick={() => handelApplyClick(selected._id)}
                        >
                            Apply
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default DashBord;