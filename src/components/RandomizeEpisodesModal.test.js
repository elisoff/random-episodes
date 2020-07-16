import React from 'react';
import { render, fireEvent, act, createEvent } from '@testing-library/react';
import RandomizeEpisodeModal from './RandomizeEpisodeModal';
import API from '../api';

jest.mock('../api/index.js');

describe('RandomizeEpisodesModal', () => {
    // const selectedShow = {
    //     id: 1,
    //     name: 'Friends',
    // };

    // beforeEach(() => {
    //     API.mockImplementation(() => {
    //         return { getEpisodesByShowId: async () => [{ name: 'Episode 1' }] };
    //     });
    // });

    // it('renders the placeholder content when first initializing', () => {
    //     const { getByTestId } = render(
    //         <RandomizeEpisodeModal onClose={jest.fn} show={selectedShow} />
    //     );

    //     const modalElement = getByTestId('randomizeEpisodeModal');
    //     const emptyEpisodeInfoCard = modalElement.querySelector(
    //         '.episode-modal'
    //     );
    //     const getSuggestionButton = modalElement.querySelector('button');

    //     expect(getSuggestionButton).not.toBeNull();
    //     expect(getSuggestionButton.textContent).toBe('Get suggestion');
    //     expect(emptyEpisodeInfoCard).not.toBeNull();
    //     expect(emptyEpisodeInfoCard.textContent).toBe('');
    // });

    // it('renders an episode suggestion when the Get Suggestion button is clicked', () => {
    //     const { getByTestId, getByText } = render(
    //         <RandomizeEpisodeModal onClose={jest.fn} show={selectedShow} />
    //     );

    //     const modalElement = getByTestId('randomizeEpisodeModal');
    //     const episodeInfoCard = modalElement.querySelector('.episode-modal');

    //     //
    //     //     fireEvent.click(getByText('Get suggestion'));
    //     // });

    //     act(() => {
    //     const myEvent = createEvent.click(getByText('Get suggestion'), {
    //         button: 0,
    //     });
    //     fireEvent(getByText('Get suggestion'), myEvent);
    // });
    // expect(episodeInfoCard.textContent).toBe('');

    // });
    // it('renders an error message when theres an error getting an episode suggestion')
    it('calls the episodes endpoint just once after mount', () => {});
});
