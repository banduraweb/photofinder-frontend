import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import InfiniteScroll from 'react-infinite-scroll-component';
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import csx from 'classnames';
import { TransitionsModal } from '../Modal/Modal';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    height: '100%',
  },
  gridList: {
    width: 900,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  iconActive: {
    color: 'red',
  },
  imgInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  left: {
    alignItems: 'flex-end',
    paddingRight: '5px',
  },
  right: {
    alignItems: 'baseline',
  },
}));

export const GridListBar = ({
  onScroll,
  photoList,
  loading,
  successLoaded,
  handleOpenCurrentImg,
  handleCloseCurrentImg,
  open,
  downloadImage,
  toggleLike,
  isMyLikesPage,
  query,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <InfiniteScroll
        dataLength={photoList.length}
        next={onScroll}
        hasMore={!isMyLikesPage || !query}
        loader={
          <div className={classes.root}>
            {loading
              ? 'loading...'
              : successLoaded && !photoList.length
              ? 'No photo by query'
              : 'Lets find!'}
          </div>
        }
      >
        <GridList cellHeight={280} className={classes.gridList} cols={2}>
          <TransitionsModal
            open={open.isOpen}
            handleClose={handleCloseCurrentImg}
            url={open.url}
          />
          {!!photoList.length &&
            photoList.map((tile, i) => (
              <GridListTile key={tile.largeImageURL}>
                <img src={tile.largeImageURL} alt={tile.type} />
                <GridListTileBar
                  className={csx(
                    classes.imgInfo,
                    i % 2 === 0 ? classes.left : classes.right
                  )}
                  title={tile.tags}
                  subtitle={<span>by: {tile.user}</span>}
                  actionIcon={[
                    <IconButton
                      onClick={() => handleOpenCurrentImg(tile.largeImageURL)}
                      key={'full screen'}
                      aria-label={`info about ${tile.type}`}
                      className={classes.icon}
                    >
                      <SettingsOverscanIcon />
                    </IconButton>,
                    <IconButton
                      onClick={() =>
                        toggleLike({
                          ...tile,
                          liked: !tile.liked,
                          photoId: tile.id.toString(),
                          url: tile.largeImageURL,
                        })
                      }
                      key={'fFavoriteIcon'}
                      aria-label={`info about ${tile.type}`}
                      className={csx(
                        tile.liked ? classes.iconActive : classes.icon
                      )}
                    >
                      {isMyLikesPage ? <DeleteForeverIcon /> : <FavoriteIcon />}
                    </IconButton>,
                    <IconButton
                      onClick={() => downloadImage(tile.largeImageURL)}
                      key={'SaveAltIcon'}
                      aria-label={`info about ${tile.type}`}
                      className={classes.icon}
                    >
                      <SaveAltIcon />
                    </IconButton>,
                  ]}
                />
              </GridListTile>
            ))}
        </GridList>
      </InfiniteScroll>
    </div>
  );
};
