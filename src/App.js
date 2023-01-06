import React, { useState } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Button, IconButton, Paper, TextField, Typography } from '@mui/material';
import { Image } from '@mui/icons-material';
import UploadModal from './components/files/UploadModal';
import { useFieldArray, useForm } from 'react-hook-form';


const testData = [
  {
    id: 1,
    question: 'manakah dibawah ini yang panjang?',
    imgUrl: '',
    options: [
      { id: 1, option: '1', imgUrl: '' },
      { id: 2, option: '2', imgUrl: '' },
      { id: 3, option: '3', imgUrl: '' },
      { id: 4, option: '4', imgUrl: '' },
    ],
    answer: {
      id: 4
    }
  },
  {
    id: 2,
    question: 'manakah dibawah ini yang pendek?',
    imgUrl: '',
    options: [
      { id: 1, option: 'kanjut', imgUrl: '' },
      { id: 2, option: 'memek', imgUrl: '' },
      { id: 3, option: 'bau', imgUrl: '' },
      { id: 4, option: 'henceut', imgUrl: '' },
    ],
    answer: {
      id: 2
    }
  },
  {
    id: 1,
    question: 'manakah dibawah ini yang sedang?',
    imgUrl: '',
    options: [
      { id: 1, option: 'kutu', imgUrl: '' },
      { id: 2, option: 'buku', imgUrl: '' },
      { id: 3, option: 'sia', imgUrl: '' },
      { id: 4, option: 'anking', imgUrl: '' },
    ],
    answer: {
      id: 2
    }
  }
]



const QuestionForms = (props) => {
  const [question, setQuestion] = useState()
  const [options, setOptions] = useState([])
  const [answer, setAnswer] = useState()

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      options: [{ id: null, option: '', imgUrl: 'https://cdn.britannica.com/16/234216-050-C66F8665/beagle-hound-dog.jpg' }]
    }
  })
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: "options",
  });


  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>

      <p>Question</p>
      <input key={'test'} {...register('question')}>
      </input>


      <p>Options</p>

      {fields.map((field, index) => {
        return (
          <li key={field.id}>
            <input {...register(`options.${index}.option`)}>
            </input>

            <input  {...register(`options.${index}.imgUrl`)}>
            </input>

            <button type='button' onClick={() => remove(index)}>
              remove
            </button>

            <input
              {...register('answer')}
              type='radio'
              value={index}

            />

          </li>
        )
      })}

      <button type='button' onClick={() => append({
        option: 'test',
        imgUrl: 'https://cdn.britannica.com/16/234216-050-C66F8665/beagle-hound-dog.jpg'
      })}>Append</button>

      <input type={'submit'} />

    </form>
  )

}

const QuestionInput = (props) => {
  return (
    <div>

      <IconButton
        color='primary'
        aria-label='upload images'
        component="label"
      >
        <input hidden accept='image/*' type={'file'}></input>
        <Image />
      </IconButton>
      <TextField
        id={props.id}
        label={props.label}
        value={props.value}
        onChange={props.onChange}
      >

      </TextField>

    </div>
  )
}

const QuestionContainer = (props) => {


  return (
    <>
      <Paper elevation={3} sx={{
        padding: 2,
        alignContent: 'left'
      }}>
        <Typography variant='p' component={"p"}>
          {props.question}
        </Typography>

        <div>
          {
            props.options.map((item, key) => {
              return (
                <Button variant='contained'>
                  {item.option}
                </Button>
              )
            })
          }

        </div>
      </Paper>
    </>
  )
}

function App() {
  const [test, setTest] = useState(testData)

  const onSubmit = (data) => {
    console.log(test)
    setTest(prev => [...prev, data])
  }

  return (
    <div className="App">

      <QuestionForms onSubmit={onSubmit} />

      <br></br>
      <br></br>
      <br></br>

      {test && test.map((data, key) => {
        return (
          <QuestionContainer question={data.question} options={data.options}>
          </QuestionContainer>

        )

      })}

    </div>
  );
}

export default App;
