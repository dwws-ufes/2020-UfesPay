import React, { useCallback, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { Typography, TextField } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Delete, Send } from '@material-ui/icons';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import {
  addComment,
  deleteComment,
  toggleLike,
} from '../../services/TransactionService';

import './styles.css';
import { useAuth } from '../../hooks/auth';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    marginBottom: 20,
  },
  media: {
    WebkitMaxInlineSize: 10,
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: red[500],
  },
  subtitle: {
    marginBottom: 10,
    fontSize: 12,
    color: 'grey',
  },
}));

const TransferCard = ({ transaction }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const { user } = useAuth();

  const [newComment, setNewComment] = useState('');
  const [transac, setTransac] = useState(transaction);
  const likesNumber = useMemo(() => transac.likes.length, [transac]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleComment = useCallback(
    e => {
      e.preventDefault();
      if (!newComment) return;
      addComment(transac._id, newComment).then(resp => {
        const updatedTransaction = { ...transac };
        updatedTransaction.comments.push(resp.comment);
        setTransac(updatedTransaction);
      });

      setNewComment('');
    },
    [newComment, transac],
  );

  const isLikedByMe = useMemo(() => {
    return !!transac.likes.filter(likeAuthor => likeAuthor === user._id).length;
  }, [transac, user]);

  const handleDeleteComment = useCallback(
    id => {
      deleteComment(id).then(() => {
        const updatedTransaction = { ...transac };
        updatedTransaction.comments = updatedTransaction.comments.filter(
          comment => comment._id !== id,
        );
        setTransac(updatedTransaction);
      });
    },
    [transac],
  );

  const handleLike = useCallback(() => {
    toggleLike(transac._id).then(() => {
      const updatedTransaction = { ...transac };
      const liked = !!updatedTransaction.likes.filter(
        likeAuthor => likeAuthor === user._id,
      ).length;

      if (liked) {
        updatedTransaction.likes = updatedTransaction.likes.filter(
          likeAuthor => likeAuthor !== user._id,
        );
      } else {
        updatedTransaction.likes.push(user._id);
      }
      setTransac(updatedTransaction);
    });
  }, [transac, user]);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {transac.emitter.name[0]}
          </Avatar>
        }
        title={transac.emitter.name}
        subheader={transac.emitter.email}
      />

      <CardContent>
        <Typography paragraph className={classes.subtitle}>
          Transferiu{' '}
          {transac.value.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          })}{' '}
          para {transac.receiver.name}
        </Typography>

        <Typography paragraph>{transac.message}</Typography>
      </CardContent>

      <CardActions disableSpacing>
        <p>{likesNumber}</p>

        <IconButton aria-label="add to favorites" onClick={handleLike}>
          <FavoriteIcon color={isLikedByMe ? 'secondary' : 'disabled'} />
        </IconButton>
        <div className={classes.expand}>
          <p>{transac.comments.length}</p>

          <IconButton onClick={handleExpandClick} aria-label="show more">
            <ChatBubbleOutlineIcon />
          </IconButton>
        </div>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography color="primary" variant="subtitle1" paragraph>
            Comentários:
          </Typography>

          {transac.comments.map(comment => (
            <ul key={comment._id}>
              <div id="comment">
                <Typography>
                  <strong>{comment.author.name}:</strong> {comment.text}
                </Typography>
                {comment.author._id === user._id && (
                  <IconButton onClick={() => handleDeleteComment(comment._id)}>
                    <Delete />
                  </IconButton>
                )}
              </div>
            </ul>
          ))}

          <form className="comment-form" onSubmit={handleComment}>
            <div className="comment-text">
              <TextField
                className="TextField"
                variant="outlined"
                id="outlined-multiline-static"
                placeholder="Escreva um comentário"
                type="text"
                required
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
              />
            </div>

            <IconButton color="primary" type="submit">
              <Send />
            </IconButton>
          </form>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default TransferCard;
