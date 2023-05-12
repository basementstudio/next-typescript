import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

import s from './header.module.scss'
import MobileMenu from './mobile-menu'

export interface headerLink {
  name: string
  url: string
}

export const Header = () => {
  const navLinks: headerLink[] = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
    { name: 'Contact', url: '/contact' }
  ]

  return (
    <>
      <Link
        target="_blank"
        href="https://foundry.basement.studio/"
        className={s.announcementBanner}
      >
        <p className={s.announcementText}>
          Introducing BASEMENT FOUNDRY
          <span>
            , a curated catalog of handmade and ever-evolving typefaces by its
            in-house artists
          </span>
          . Check it out
        </p>
        <svg viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.9497 1.56716L15.7542 6.3806L-3.76766e-07 6.3806L-2.78905e-07 8.6194L15.7542 8.6194L10.9497 13.4328L12.514 15L20 7.5L12.514 4.06671e-07L10.9497 1.56716Z"
            fill="white"
          />
        </svg>
      </Link>
      <div className={s.container}>
        <header className={s.header}>
          <Link href="/" className={s.logo}>
            <svg
              viewBox="0 0 250 250"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M59.4125 135.371C59.4125 125.265 67.6033 117.074 77.7092 117.074H106.703C116.809 117.074 125 125.265 125 135.371V179.308C125 189.414 116.809 197.604 106.703 197.604H77.7092C67.6033 197.604 59.4125 189.414 59.4125 179.308V135.371ZM57.5645 202.569C57.5645 229.105 79.0754 250 105.612 250H134.758C161.703 250 183.549 228.154 183.549 201.209V112.83C183.549 85.8847 161.703 64.0385 134.758 64.0385H98.1649C76.7151 64.0385 59.2844 81.957 59.132 103.401V0H0.58252V248.78H57.5645V202.569Z"
                fill="white"
              />
              <path
                d="M249.418 197.604H198.187V248.835H249.418V197.604Z"
                fill="white"
              />
            </svg>
          </Link>
          <ul className={s.nav}>
            {navLinks.map(({ name, url }) => (
              <li key={name} className={s.navItem}>
                <Link href={url}>{name}</Link>
              </li>
            ))}
          </ul>
          <MobileMenu links={navLinks} />
          <div className={s.navButtonContainer}>
            <button className={clsx(s.navButton, s.navButtonPrimary)}>
              Primary
            </button>
            <button className={clsx(s.navButton, s.navButtonSecondary)}>
              Secondary
            </button>
          </div>
        </header>
      </div>
    </>
  )
}
