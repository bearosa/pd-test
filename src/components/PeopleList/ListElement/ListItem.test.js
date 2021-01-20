import { render, screen } from '@testing-library/react';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ListElement from './';

test('renders info', () => {
  const person = {
    "id": 103,
    "company_id": 7813131,
    "owner_id": {
      "id": 11942664,
      "name": "Beatriz Rosa",
      "email": "beatrizccrosa@gmail.com",
      "has_pic": 0,
      "pic_hash": null,
      "active_flag": true,
      "value": 11942664
    },
    "org_id": {
      "name": "Rite Aid Pharmacy",
      "people_count":1,
      "owner_id":11942664,
      "address":"28 Cleveland Ave.",
      "active_flag":true,
      "cc_email":"fe-test@pipedrivemail.com",
      "value":103
    },
    "name":"Mila Benson",
    "first_name":"Mila",
    "last_name":"Benson",
    "open_deals_count":0,
    "related_open_deals_count":0,
    "closed_deals_count":0,
    "related_closed_deals_count":0,
    "participant_open_deals_count":0,
    "participant_closed_deals_count":0,
    "email_messages_count":0,
    "activities_count":0,
    "done_activities_count":0,
    "undone_activities_count":0,
    "files_count":0,
    "notes_count":0,
    "followers_count":1,
    "won_deals_count":0,
    "related_won_deals_count":0,
    "lost_deals_count":0,
    "related_lost_deals_count":0,
    "active_flag":true,
    "phone":[
      {
        "label":"work",
        "value":"(721) 933-0127",
        "primary":true
      }
    ],
    "email":[
      {
        "label":"work",
        "value":"mila.benson@pipedrive.com",
        "primary":true
      }
    ],
    "first_char":"m",
    "update_time":"2021-01-18 15:36:08",
    "add_time":"2021-01-17 11:44:54",
    "visible_to":"3",
    "picture_id":{
      "item_type":"person",
      "item_id":103,
      "active_flag":true,
      "add_time":"2021-01-18 15:36:07",
      "update_time":"0000-00-00 00:00:00",
      "added_by_user_id":11942664,
      "pictures":{
        "128":"https://pipedrive-profile-pics.s3.amazonaws.com/c662095da1a8169cb828f10740d0d69dba97aa5b_128.jpg",
        "512":"https://pipedrive-profile-pics.s3.amazonaws.com/c662095da1a8169cb828f10740d0d69dba97aa5b_512.jpg"
      },
      "value":1
    },
    "next_activity_date":null,
    "next_activity_time":null,
    "next_activity_id":null,
    "last_activity_id":null,
    "last_activity_date":null,
    "last_incoming_mail_time":null,
    "last_outgoing_mail_time":null,
    "label":null,
    "bff2c8b4ca9b3591be6f56b61108531ffcdb4a61":"Ulysses Muth",
    "b0cc020463afa8d79510c0f9c577b85163ce4a55":"EU clients",
    "org_name":"Rite Aid Pharmacy",
    "owner_name":"Beatriz Rosa",
    "cc_email":"fe-test@pipedrivemail.com"
  }

  render(
    <DragDropContext>
      <Droppable droppableId="list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <ListElement person={person} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );

  const infoElement = screen.getByTestId("list-element");

  expect(infoElement).toHaveTextContent(person.name);
  expect(infoElement).toHaveTextContent(person.org_name);
});