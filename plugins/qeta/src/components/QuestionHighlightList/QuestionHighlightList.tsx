import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from '@material-ui/core';
import React from 'react';
import { useQetaApi, useStyles } from '../../utils/hooks';
import { Skeleton } from '@material-ui/lab';

export const QuestionHighlightList = (props: {
  type: string;
  title: string;
  noQuestionsLabel: string;
}) => {
  const {
    value: response,
    loading,
    error,
  } = useQetaApi(api => api.getQuestionsList(props.type), []);
  const classes = useStyles();

  return (
    <Box
      className={classes.questionHighlightList}
      display={{ md: 'none', lg: 'block' }}
    >
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            {props.title}
          </ListSubheader>
        }
      >
        {loading && (
          <ListItem>
            <Skeleton variant="rect" />
          </ListItem>
        )}
        {error && (
          <ListItem>
            <ListItemText>Failed to load questions</ListItemText>
          </ListItem>
        )}
        {response && response.questions && response.questions.length === 0 && (
          <ListItem>
            <ListItemText>{props.noQuestionsLabel}</ListItemText>
          </ListItem>
        )}
        {response &&
          response.questions &&
          response?.questions.map(q => (
            <React.Fragment key={q.id}>
              <Divider />
              <ListItem
                button
                dense
                component="a"
                href={`/qeta/questions/${q.id}`}
              >
                <ListItemText>{q.title}</ListItemText>
              </ListItem>
            </React.Fragment>
          ))}
      </List>
    </Box>
  );
};
