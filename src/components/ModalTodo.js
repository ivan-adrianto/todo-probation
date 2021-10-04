/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useEffect, useState } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import { connect } from 'react-redux'
import { addTodo, deleteTodo, updateTodo } from '../redux/action/actions'
import './ModalDetail.css'

const ModalDetail = ({
  description,
  title,
  removeTodo,
  editTodo,
  todos,
  id,
  toggle,
  trigger,
  modalFunction,
  newTodo
}) => {
  const [titleNew, setTitleNew] = useState('')
  const [descriptionNew, setDescriptionNew] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [statusTitle, setStatusTitle] = useState(true)
  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState)

  useEffect(() => {
    modalFunction === 'modalDetail' &&
      trigger &&
      setStatusTitle(todos.find((todo) => todo.id == id).status)
  }, [trigger])

  const data = [
    {
      id: id ? parseInt(id) : todos.length + 1,
      title: titleNew !== '' ? titleNew : title,
      description: descriptionNew !== '' ? descriptionNew : description,
      status: statusTitle
    }
  ]

  const handleSave = () => {
    editTodo(data)
    toggle()
  }

  const handleAdd = () => {
    newTodo(data)
    toggle()
  }

  const handleDelete = () => {
    removeTodo(parseInt(id))
    toggle()
  }

  return (
    <div>
      <Modal isOpen={trigger} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {modalFunction === 'add' ? <h5>Add New Todo</h5> : <h5>Edit Todo</h5>}
        </ModalHeader>
        <ModalBody>
          {modalFunction === 'add' ? (
            <div>
              <label>Title</label> <br />
              <input
                type='text'
                className='form-control'
                onChange={(e) => setTitleNew(e.target.value)}
              />
              <label>Description</label> <br />
              <input
                type='text'
                className='form-control'
                onChange={(e) => setDescriptionNew(e.target.value)}
              />
            </div>
          ) : (
            <div>
              <label>Title</label>
              <input
                type='text'
                className='form-control'
                defaultValue={title}
                onChange={(e) => setTitleNew(e.target.value)}
              />
              <label>Description</label> <br />
              <input
                type='text'
                className='form-control'
                defaultValue={description}
                onChange={(e) => setDescriptionNew(e.target.value)}
              />
              <p>Status</p>
              <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle className='status-button' caret color='success'>
                  {statusTitle ? 'Ongoing' : 'Done'}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    className='status-item'
                    onClick={() => setStatusTitle(false)}
                  >
                    Done
                  </DropdownItem>
                  <DropdownItem
                    className='status-item'
                    onClick={() => setStatusTitle(true)}
                  >
                    Ongoing
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          {modalFunction === 'modalDetail' ? (
            <div>
              <Button color='primary' onClick={handleSave}>
                Save
              </Button>{' '}
              <Button color='danger' onClick={handleDelete}>
                Delete
              </Button>
            </div>
          ) : (
            <div>
              <Button color='primary' onClick={handleAdd}>
                Add
              </Button>{' '}
              <Button color='secondary' onClick={toggle}>
                Cancel
              </Button>
            </div>
          )}
        </ModalFooter>
      </Modal>
    </div>
  )
}

const stateProps = (initialState) => {
  return {
    todos: initialState.todos
  }
}

const dispatchProps = (dispatch) => {
  return {
    editTodo: (data) => dispatch(updateTodo(data)),
    removeTodo: (data) => dispatch(deleteTodo(data)),
    newTodo: (data) => dispatch(addTodo(data))
  }
}

export default connect(stateProps, dispatchProps)(ModalDetail)
