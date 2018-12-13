import { trigger, state, style, transition, animate, query, animateChild } from "@angular/animations";

export const tttt = trigger('tttt', [
    transition(':enter', [
      query('span', [
        style({ color: 'yellow' })
      ]),
      query('.back3--img', animateChild())
    ])
  ])

export const scrollRevealL = trigger('scrollRevealL', [
    state('hideL', style({
        transform: 'translateX(-80rem)'
    })),
    transition('hideL => showL', [
        animate('750ms ease', style({
            transform: 'scale(.7) translateX(0)',
        })),
        animate('300ms ease', style({
            transform: 'scale(1)'
        }))
    ]),
    transition('showL => hideL', [
        animate('900ms ease')
    ])
]);
export const scrollRevealR = trigger('scrollRevealR', [
    state('hideR', style({
        transform: 'translateX(80rem)'
    })),
    transition('hideR => showR', [
        animate('750ms ease', style({
            transform: 'scale(.7) translateX(0)',
        })),
        animate('300ms ease', style({
            transform: 'scale(1)'
        }))
    ]),
    transition('showR => hideR', [
        animate('900ms ease')
    ])
]);
