'use client'

import clsx from 'clsx'
import Link from 'next/link'
import React, { FC, useState } from 'react'

import { usePreventScroll } from '~/hooks/use-prevent-scroll'

import { Portal } from '../portal'
import type { headerLink } from '.'
import s from './header.module.scss'

interface MobileMenuProps {
  links: headerLink[]
}

const MobileMenu: FC<MobileMenuProps> = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)
  const openMenu = () => setIsOpen(true)
  usePreventScroll(isOpen)

  return (
    <>
      <button className={clsx(s.icon, s.burguer)} onClick={openMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
          <path d="M1 8h15v2H1z" fill="currentColor"></path>
          <line
            x1="1"
            y1="15"
            x2="25"
            y2="15"
            stroke="currentColor"
            strokeWidth="2"
          ></line>
          <path d="M1 20h24v2H1z" fill="currentColor"></path>
        </svg>
      </button>
      {isOpen && (
        <Portal id="menu-modal">
          <div className={s.menuContainer}>
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
              <button className={s.icon} onClick={closeMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
                  <path
                    d="M1 8h24v2H1z"
                    fill="currentColor"
                    data-svg-origin="13 9"
                    data-original="M1 8h15v2H1z"
                    transform="matrix(0.70711,0.70711,-0.70711,0.70711,10.17156,-0.55642)"
                  ></path>
                  <line
                    x1="1"
                    y1="15"
                    x2="25"
                    y2="15"
                    stroke="currentColor"
                    strokeWidth="2"
                    data-svg-origin="13 15"
                    transform="matrix(0.1,0,0,0.1,11.7,13.5)"
                  ></line>
                  <path
                    d="M1 20h24v2H1z"
                    fill="currentColor"
                    data-svg-origin="13 21"
                    transform="matrix(0.70711,-0.70711,0.70711,0.70711,-11.04174,9.34312)"
                  ></path>
                </svg>
              </button>
            </header>
            <nav className={s.menuLinksContainer}>
              <ul>
                {links.map(({ name, url }) => (
                  <li key={name}>
                    <Link className={s.menuLinks} href={url}>
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Portal>
      )}
    </>
  )
}

export default MobileMenu
