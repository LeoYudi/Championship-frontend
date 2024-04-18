import { forwardRef } from 'react';

import TrophyIcon from '@mui/icons-material/EmojiEvents';

import './styles.scss'

type PositionPropTypes = {
  name: string,
  placement: number,
  score: number
}

const Position = forwardRef(({ name, placement, score }: PositionPropTypes, ref: any) => {

  return (
    <div
      ref={ref}
      className='position'
      style={{ top: `calc(${(placement - 1) * 3.5}rem + 80px)` }}
    >
      <div className='placement'>
        {placement === 1 && <TrophyIcon sx={{ color: '#ffd700' }} fontSize='large' />}
        {placement === 2 && <TrophyIcon sx={{ color: '#c0c0c0' }} fontSize='large' />}
        {placement === 3 && <TrophyIcon sx={{ color: '#cd7f32' }} fontSize='large' />}
        {placement > 3 && placement}
      </div>
      <div className='name'>{name}</div>
      <div className='score'>{score} pts</div>
    </div>
  );
})

export { Position }