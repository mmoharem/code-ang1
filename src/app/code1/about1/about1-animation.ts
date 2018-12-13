import { trigger, transition, style, animate, keyframes, state } from '@angular/animations';

export const pens = trigger('pens', [
    state('pensOut',
      style({
        top: '-30rem',
        left: '-75rem',
        transform: 'rotate(-90deg)',
        transformOrigin: '77% 60%'
      })
    ),
    transition('pensOut => pensIn', [
      animate('1.5s 180ms ease', style({
        top: '-10rem',
        left: '-24rem',
        transform: 'rotate(0deg)',
        transformOrigin: '77% 60%'
        }))
    ]),
    transition('pensIn => pensOut', [
      animate('1s ease')
    ])
  ]);

export const paper = trigger('paper', [
    state('paperOut',
      style({
        bottom: '-35rem',
        left: '-45rem',
        transform: 'rotate(60deg)',
        opacity: '0'
      })
    ),
    transition('paperOut => paperIn', [
      animate('1.5s 180ms ease', style({
        bottom: '-20rem',
        left: '-15rem',
        transform: 'rotate(0deg)',
        opacity: '1'
        }))
    ]),
    transition('paperIn => paperOut', [
      animate('1s ease')
    ])
  ]);

export const plant = trigger('plant', [
    state('plantOut',
      style({
        transform: 'rotate(90deg)',
        transformOrigin: '77% 60%',
        top: '-50rem',
        right: '-18rem',
      })
    ),
    transition('plantOut => plantIn', [
      animate('1.5s 180ms ease', style({
        transform: 'rotate(0deg)',
        transformOrigin: '77% 60%',
        top: '-10rem',
        right: '4rem'
        }))
    ]),
    transition('plantIn => plantOut', [
      animate('1s ease')
    ])
  ]);