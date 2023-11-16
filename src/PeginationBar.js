import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import useRQ from './hooks/useRQ';

const PaginationBar = () => {
  const [active, setActive]=useState(1);
  let {page}=useParams();
  page=Number(page);
  const {usersQuery}=useRQ();
  const {refetch}=useQuery(
    ["users", page], 
    ()=>usersQuery(page),
    {
      retry: 0,
      enabled: false
    }
  )

  useEffect(()=>{
    refetch();
  },[page])

  // const [length, setLength]=useState(6);
  const [data, setData]=useState(
    [
        {
            "id": 7,
            "email": "michael.lawson@reqres.in",
            "first_name": "Michael",
            "last_name": "Lawson",
            "avatar": "https://reqres.in/img/faces/7-image.jpg"
        },
        {
            "id": 8,
            "email": "lindsay.ferguson@reqres.in",
            "first_name": "Lindsay",
            "last_name": "Ferguson",
            "avatar": "https://reqres.in/img/faces/8-image.jpg"
        },
        {
            "id": 9,
            "email": "tobias.funke@reqres.in",
            "first_name": "Tobias",
            "last_name": "Funke",
            "avatar": "https://reqres.in/img/faces/9-image.jpg"
        },
        {
            "id": 10,
            "email": "byron.fields@reqres.in",
            "first_name": "Byron",
            "last_name": "Fields",
            "avatar": "https://reqres.in/img/faces/10-image.jpg"
        },
        {
            "id": 11,
            "email": "george.edwards@reqres.in",
            "first_name": "George",
            "last_name": "Edwards",
            "avatar": "https://reqres.in/img/faces/11-image.jpg"
        },
        {
            "id": 12,
            "email": "rachel.howell@reqres.in",
            "first_name": "Rachel",
            "last_name": "Howell",
            "avatar": "https://reqres.in/img/faces/12-image.jpg"
        }
    ]
  );
  
  // useEffect(()=>{ console.log("page", page); refetch();},[]);
  const navigate=useNavigate();

  const items = [];
  for (let number = 1; number <= 6; number++) {
    items.push(
      <Pagination.Item
        key={`page-${number}`}
        active={number === active}
        onClick={() => { setActive(number); navigate("/user"+`/${number}`); }}
      >
        {number}
      </Pagination.Item>,
    );
  }
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} className='text-center'>
          <h2>Pagination with React - Query </h2>
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col xs={4}>
          <Pagination size="lg">{items}</Pagination>
        </Col>
      </Row>
      <Row className="mt-3">
        {data.map((item) => (
          <Col key={item.id} xs={12} md={6}>
            <Row className={"border rounded p-3 mb-3 mx-2 bg-light"}>
              <Col xs={3} >
                <img src={item.avatar} alt={`user${item}`} />
              </Col>
              <Col xs={9}>
                <h5>Email : {item.email}</h5>
                <h5>First name : {item.first_name}</h5>
                <h5>Last name : {item.last_name}</h5>
                <h5>User Id : {item.id}</h5>
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
      {/* {page} */}
    </Container>
  );
};

export default PaginationBar;
