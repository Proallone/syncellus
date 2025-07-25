import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getDatabaseVersionFromDb } from "../../../src/modules/health/repository";
import { getApplicationStatus, getDatabaseVersion } from '../../../src/modules/health/service.js'

vi.mock('../../../src/modules/health/repository');

describe('Health Service', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('getApplicationStatus should return a "Healthy!" string', () => {
        // Act
        const status = getApplicationStatus();
        // Assert
        expect(status).toBe('Healthy!');
    });

    describe('getDatabaseVersion', () => {
        it('should return a healthy status and database version from the repository', async () => {
            // Arrange
            const mockDbVersion = { sqlite_version: '3.42.0' };
            vi.mocked(getDatabaseVersionFromDb).mockResolvedValue(mockDbVersion);

            // Act
            const result = await getDatabaseVersion();

            // Assert
            expect(result).toEqual({
                status: "Healthy",
                ...mockDbVersion
            });

            expect(getDatabaseVersionFromDb).toHaveBeenCalledTimes(1);
        });

        it('should handle a rejected repository promise gracefully', async () => {
            // Arrange
            vi.mocked(getDatabaseVersionFromDb).mockRejectedValue(new Error('Database connection failed'));

            // Act & Assert
            await expect(getDatabaseVersion()).rejects.toThrow('Database connection failed');

            // Verify that the repository was still called
            expect(getDatabaseVersionFromDb).toHaveBeenCalledTimes(1);
        });
    });
});