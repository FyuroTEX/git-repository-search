import React from 'react';
import { useSelector } from 'react-redux';
import PaginationExamplePagination from '../Pagination/Pagination';
import { List } from 'semantic-ui-react';

const ListItem = ({ name, url, description }) => (
  <List.Item>
    <List.Icon name='github' size='large' verticalAlign='middle' />
    <List.Content>
      <List.Header as='a' href={url} target='_blank'>
        {name}
      </List.Header>
      <List.Description as='a'>{description}</List.Description>
    </List.Content>
  </List.Item>
);

const SeachList = () => {
  const result = useSelector((state) => state.search.list.data);

  return (
    <>
      {result.length > 0 && <PaginationExamplePagination />}
      <List divided relaxed>
        {result.map((item) => {
          return (
            <ListItem
              key={item.id}
              name={item.full_name}
              description={item.description}
              url={item.html_url}
            />
          );
        })}
      </List>
    </>
  );
};

export default SeachList;
