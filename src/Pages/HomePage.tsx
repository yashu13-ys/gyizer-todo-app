import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, redirect, Navigate } from "react-router-dom";
import './HomePage.css';
import Header from '../Components/Header';
import AddIcon from '../assets/AddIcon.png';
import EditGreyIcon from '../assets/editGreyIcon.png';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

function HomePage() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [deletConfirm, setDeleteConfirm] = useState(false)
    const [taskItemDelete, setTaskItemDelete]: any = useState({})
    const [taskItemEdit, setTaskItemEdit]: any = useState({})
    const [customId, setCustomId]: any = useState(0)
    const [taskListData, setTaskListData]: any = useState([])

    const [mobileView, setMobileView]: any = useState<boolean>(
        window.innerWidth <= 768
      );

      useEffect(() => {
        function updateSize() {
          if (window.innerWidth <= 768)
            setMobileView(true);
          else
            setMobileView(false);
        }
        window.addEventListener("resize", updateSize);
      }, [mobileView]);

    const onDragEnd = (result: any) => {
        if (!result.destination) return; // dropped outside the list

        const newItems = Array.from(taskListData);
        const [reorderedItem] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, reorderedItem);

        setTaskListData(newItems);
    };


    function addTaskToList() {
        let tempTaskData = [...taskListData]
        if (title.trim() == '') {
            alert('Please Enter Task Title.')
            return;
        }
        if (description.trim() == '') {
            alert('Please Enter Task Description.')
            return;
        }
        let json = {
            id: customId + 1,
            title: title,
            description: description,
            info: false
        }
        tempTaskData = [...taskListData, json]
        setTaskListData(tempTaskData)
        setTitle("")
        setDescription("")
        setCustomId(json.id)
        console.log('tempTaskData', tempTaskData)
    }


    function onInfoClick(item: any) {
        let tempTaskData = [...taskListData]
        for (let i = 0; i < tempTaskData.length; i++) {
            if (tempTaskData[i].id == item.id) {
                tempTaskData[i].info = true
            }
        }
        setTaskListData(tempTaskData)
    }


    function deletConfirmPopUp(item: any) {
        setDeleteConfirm(true)
    }

    function deleteTaskItem() {
        let tempTaskData = [...taskListData]
        for (let i = 0; i < tempTaskData.length; i++) {
            if (tempTaskData[i].id == taskItemDelete.id) {
                tempTaskData.splice(i, 1);
            }
        }
        setTaskListData(tempTaskData)
        setDeleteConfirm(false);
        setTaskItemDelete({})
    }

    function upadetTaskItem(){
        let tempTaskData = [...taskListData]
        let tempTaskEditItem = {...taskItemEdit}
        for(let i=0;i<tempTaskData.length;i++){
            if(tempTaskData[i].id == tempTaskEditItem.id){
                tempTaskData[i].title = title;
                tempTaskData[i].description = description;
                tempTaskData[i].info = false;
            }
        }
        setTaskListData(tempTaskData)
        setTaskItemEdit({})
        setTitle("")
        setDescription("")
    }

    return (
        <div style={{ backgroundColor: '#1b1a17', height: '100vh', color: '#fff' }}>
            <Header />
            <div className='homePageMainContainer'>
                <div className='mainAddTaskInputContainer'>
                    <div className='inputContainer'>
                        <input
                            className='hoemPageInputs'
                            type='text'
                            name='title'
                            placeholder='Title...'
                            autoFocus={true}
                            value={title}
                            onChange={(e) => { console.log('test45', e); setTitle(e.target.value) }}
                            maxLength={15}
                        />
                        <input
                            className='hoemPageInputs'
                            type='text'
                            name='title'
                            placeholder='Input...'
                            autoFocus={true}
                            value={description}
                            onChange={(e) => { console.log('test45', e); setDescription(e.target.value) }}
                            maxLength={25}
                        />
                    </div>
                    <div className='addTaskButton'
                        onClick={() => {
                            if (taskItemEdit && taskItemEdit.id) {
                                upadetTaskItem()
                            } else {
                                addTaskToList()
                            }
                        }}>
                        {taskItemEdit && taskItemEdit.id ?
                            <div style={{ fontSize: '0.91vw', fontWeight: '700', color: '#FFFFFF' }}>
                                Update
                            </div>
                            :
                            <img src={AddIcon} style={{ width: mobileView?'24px':'1.56vw', height:mobileView?'24px':'1.56vw' }} />
                        }
                    </div>
                </div>

{!mobileView ? <>
                {taskListData && taskListData.length > 0 ?
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className='taskListContainerWithTask'>
                            <div className='taskContainer'>
                                <Droppable key={'mainGroup-' + 1}
                                    droppableId={`${'mainGroup-' + 1}`}
                                    type='droppableGroup'>
                                    {(provided) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            style={{ display: 'flex', flexDirection: 'column', gap: '2.2vw' }}
                                        >
                                            {taskListData.map((item: any, index: any) => (
                                                <Draggable index={index}
                                                    key={`drag-project-id-${item.id}`}
                                                    draggableId={`dragprojectid-${item.id}`}

                                                >
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className='taskItemDiv'
                                                        >
                                                            <div>
                                                                <div style={{ fontSize: '1.43vw', fontWeight: '500', color: '#F0E3CA' }}>
                                                                    {item.title}
                                                                </div>
                                                                <div style={{ fontSize: '0.91vw', fontWeight: '500', color: '#F0E3CA', marginTop: '0.32vw' }}>
                                                                    {item.description}
                                                                </div>
                                                            </div>
                                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.58vw' }}>
                                                                {item.info ?
                                                                    <>
                                                                        <div className='iBtnDiv' style={taskItemEdit && taskItemEdit.id == item.id ?{background:'#A35709'}:{}} onClick={() => {setTaskItemEdit(item);setTitle(item.title);setDescription(item.description)}}>
                                                                            <img src={EditGreyIcon} style={{ width: '0.71vw', height: '0.71vw', }} />
                                                                        </div>
                                                                        <div className='iBtnDiv' onClick={() => { setDeleteConfirm(true); setTaskItemDelete(item) }}>
                                                                            <img src={AddIcon} style={{ width: '0.71vw', height: '0.71vw', transform: 'rotate(45deg)' }} />
                                                                        </div>
                                                                    </>
                                                                    :
                                                                    <div className='iBtnDiv' onClick={() => onInfoClick(item)}>
                                                                        i
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}

                                            {provided.placeholder}

                                        </div>
                                    )}
                                </Droppable>

                            </div>
                        </div>
                    </DragDropContext>
                    :
                    <div className='taskListContainer'>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '0.97vw' }}>
                            <div style={{ border: '0.19vw solid #FF8303', width: '4.16vw', borderRadius: '0.32vw' }}></div>
                            <div style={{ fontSize: '1.56vw', fontWeight: '400', marginTop: '-0.32vw' }}>
                                No tasks
                            </div>
                            <div style={{ border: '0.19vw solid #FF8303', width: '4.16vw', borderRadius: '0.32vw' }}></div>
                        </div>
                    </div>
                }
</>
:
<>
{taskListData && taskListData.length > 0 ?
<div>

</div>
:
<div>
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 12,marginTop:60 }}>
                            <div style={{ border: '0.19vw solid #FF8303', width: '4.16vw', borderRadius: '0.32vw' }}></div>
                            <div style={{ fontSize: '1.56vw', fontWeight: '400', marginTop: -5 }}>
                                No tasks
                            </div>
                            <div style={{ border: '0.19vw solid #FF8303', width: '4.16vw', borderRadius: '0.32vw' }}></div>
                        </div>
</div>
}
</>
}

                {deletConfirm &&
                    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#0000004D', zIndex: 9 }}>
                        <ClickAwayListener onClickAway={() => {
                            setDeleteConfirm(false);
                            setTaskItemDelete({})
                        }}>
                            <div className='deleteConfirmPopUp'>
                                <div style={{color:'#FFFFFF',fontSize:'1.17vw'}}>
                                    Delete this task?
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.65vw', marginTop: '1.95vw' }}>
                                    <div className='popUpBtn' onClick={() => { deleteTaskItem() }}>
                                        Yes
                                    </div>
                                    <div className='popUpBtn' onClick={() => {
                                        setDeleteConfirm(false);
                                        setTaskItemDelete({})
                                    }}>
                                        No
                                    </div>
                                </div>
                            </div>
                        </ClickAwayListener>
                    </div>
                }


            </div>
        </div>
    );
}

export default HomePage;
