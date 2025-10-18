'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Download } from 'lucide-react'

interface PodcastPlayerProps {
  audioUrl: string
  title: string
  author: string
  duration?: number
  onEnded?: () => void
}

export function PodcastPlayer({ audioUrl, title, author, duration, onEnded }: PodcastPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [totalDuration, setTotalDuration] = useState(duration || 0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [hasError, setHasError] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => {
      setTotalDuration(audio.duration)
      setHasError(false)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      if (onEnded) onEnded()
    }

    const handleError = () => {
      setHasError(true)
      setIsPlaying(false)
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
    }
  }, [onEnded])

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio || hasError) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().catch(() => {
        setHasError(true)
        setIsPlaying(false)
      })
    }
    setIsPlaying(!isPlaying)
  }

  const skipForward = () => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = Math.min(audio.currentTime + 15, totalDuration)
    }
  }

  const skipBackward = () => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = Math.max(audio.currentTime - 15, 0)
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    const progressBar = progressRef.current
    if (!audio || !progressBar) return

    const rect = progressBar.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = x / rect.width
    audio.currentTime = percentage * totalDuration
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isMuted) {
      audio.volume = volume
      setIsMuted(false)
    } else {
      audio.volume = 0
      setIsMuted(true)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const newVolume = parseFloat(e.target.value)
    audio.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const changePlaybackRate = () => {
    const audio = audioRef.current
    if (!audio) return

    const rates = [0.5, 0.75, 1, 1.25, 1.5, 2]
    const currentIndex = rates.indexOf(playbackRate)
    const nextIndex = (currentIndex + 1) % rates.length
    const newRate = rates[nextIndex]

    audio.playbackRate = newRate
    setPlaybackRate(newRate)
  }

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progress = (currentTime / totalDuration) * 100 || 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-2xl p-6 shadow-2xl text-white"
    >
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
            <span className="text-2xl">🎙️</span>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg line-clamp-1">{title}</h3>
            <p className="text-sm text-blue-200">Por {author}</p>
          </div>
        </div>
      </div>

      {/* Waveform Placeholder / Progress Bar */}
      <div
        ref={progressRef}
        onClick={handleProgressClick}
        className="relative h-2 bg-white/20 rounded-full cursor-pointer mb-2 hover:h-3 transition-all"
      >
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
          style={{ width: `${progress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg transition-all"
          style={{ left: `calc(${progress}% - 8px)` }}
        />
      </div>

      {/* Time Display */}
      <div className="flex justify-between text-xs text-blue-200 mb-4">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(totalDuration)}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <button
          onClick={skipBackward}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          title="Retroceder 15s"
        >
          <SkipBack className="w-6 h-6" />
        </button>

        <button
          onClick={togglePlayPause}
          disabled={hasError}
          className={`p-4 rounded-full transition-transform shadow-xl ${
            hasError
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-white text-blue-900 hover:scale-110'
          }`}
        >
          {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
        </button>

        <button
          onClick={skipForward}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          title="Adelantar 15s"
        >
          <SkipForward className="w-6 h-6" />
        </button>
      </div>

      {/* Additional Controls */}
      <div className="flex items-center justify-between gap-4">
        {/* Volume Control */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 accent-blue-400"
          />
        </div>

        {/* Playback Speed */}
        <button
          onClick={changePlaybackRate}
          className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium hover:bg-white/30 transition-colors"
        >
          {playbackRate}x
        </button>

        {/* Download */}
        <a
          href={audioUrl}
          download
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          title="Descargar audio"
        >
          <Download className="w-5 h-5" />
        </a>
      </div>

      {/* Live Indicator */}
      {isPlaying && !hasError && (
        <motion.div
          className="flex items-center gap-2 mt-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-2 h-2 bg-red-500 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          />
          <span className="text-xs text-red-400 font-medium">EN REPRODUCCIÓN</span>
        </motion.div>
      )}

      {/* Error Message */}
      {hasError && (
        <div className="mt-4 text-center text-sm text-yellow-300">
          Audio no disponible en este momento
        </div>
      )}
    </motion.div>
  )
}
