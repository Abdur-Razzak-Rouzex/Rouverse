import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import useStyles from "../utils/styles";
import moment from "moment";
import {useSelector} from "react-redux";
import {useSnackbar} from "notistack";
import {Box} from "@material-ui/core";

const PostCard = ({post, socket}) => {
    const classes = useStyles();
    const time = moment(post.createdAt);
    const user = useSelector(state => state.user);
    const {enqueueSnackbar} = useSnackbar();

    const [liked, setLiked] = useState(false);

    const handleNotification = (type) => {
        if (user.userInfo) {
            type === 1 && setLiked(true);
            socket.emit("sendNotification", {
                senderName: user?.userInfo?.username,
                receiverName: post.username,
                type,
            });
        }else {
            enqueueSnackbar('Please login first', {variant: 'error'});
        }
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar alt={post.username} src={post.userImg}/>
                }

                title={post.fullName}
                subheader={time.format("lll") + ' (' + time.fromNow() + ')'}
            />
            <span>{}</span>
            <CardMedia
                className={classes.media}
                image={post.postImg}
                title="posted image"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {post.textStatus}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {liked ? (
                    <Box>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon color='secondary' />
                        </IconButton>
                    </Box>
                ): (
                    <Box onClick={() => handleNotification(1)}>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                    </Box>
                )}
                {post.totalLikes}
                <IconButton aria-label="share">
                    <ShareIcon/>
                </IconButton>
                0
            </CardActions>
        </Card>
    );
}

export default PostCard;