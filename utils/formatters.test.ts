import { describe, it, expect } from 'vitest'
import { formatMovieYear, formatNA } from './formatters'

describe('formatMovieYear', () => {
  it('devuelve N/A si year es undefined', () => {
    expect(formatMovieYear(undefined)).toBe('N/A')
  })

  it('devuelve el año si es un string simple', () => {
    expect(formatMovieYear('2020')).toBe('2020')
  })

  it('devuelve solo el primer año si viene en rango', () => {
    expect(formatMovieYear('2019–2022')).toBe('2019')
    expect(formatMovieYear('2019-2022')).toBe('2019')
  })

  it('devuelve el valor original si no es un año válido', () => {
    expect(formatMovieYear('N/A')).toBe('N/A')
    expect(formatMovieYear('unknown')).toBe('unknown')
  })
})

describe('formatNA', () => {
  it('devuelve el fallback si el valor es null o undefined', () => {
    expect(formatNA(null)).toBe('No disponible')
    expect(formatNA(undefined)).toBe('No disponible')
  })

  it('devuelve el fallback si el valor es N/A o vacío', () => {
    expect(formatNA('N/A')).toBe('No disponible')
    expect(formatNA('')).toBe('No disponible')
    expect(formatNA('   ')).toBe('No disponible')
  })

  it('devuelve el valor como string si es válido', () => {
    expect(formatNA('Drama')).toBe('Drama')
    expect(formatNA(2024)).toBe('2024')
  })

  it('permite un fallback personalizado', () => {
    expect(formatNA(null, 'Sin datos')).toBe('Sin datos')
  })
})
