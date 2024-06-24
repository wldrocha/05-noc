import mongoose from 'mongoose'
import { MongoDatabase } from '../init'
import { logModel } from './log.model'
import { create } from 'domain'
import exp from 'constants'

describe('log.model.ts', () => {
  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: process.env.MONGO_DB_NAME!,
      mongoUrl: process.env.MONGO_URL!
    })
  })
  afterAll(() => {
    mongoose.connection.close()
  })
  test('should return LogModel', async () => {
    const logData = {
      origin: 'log.model.test.ts',
      message: 'should return LogModel',
      level: 'low'
    }
    const log = await logModel.create(logData)

    expect(log).toEqual(
      expect.objectContaining({
        ...logData,
        createdAt: expect.any(Date),
        id: expect.any(String)
      })
    )

    await logModel.findByIdAndDelete(log.id)
  })

  test('should return the schema object', () => {
    const schema = logModel.schema.obj
    expect(schema).toEqual(
      expect.objectContaining({
        level: {
          type: expect.any(Function),
          required: true,
          enum: ['low', 'medium', 'high']
        },
        message: { type: expect.any(Function), required: true },
        createdAt: { type: expect.any(Function), default: expect.any(Date) },
        origin: { type: expect.any(Function), required: true }
      })
    )
  })
})
