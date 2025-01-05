import { User } from '../../interfaces/user';
import {
  ModalOverlay,
  ModalUserLayout,
  ModalUserProfile,
} from '../../styles/modal/modal-styles';
import { Button } from '../../styles/ui/button';
import {
  DivFormContainer,
  FormContainer,
  FormItem,
} from '../../styles/ui/form';
import { Input, InputContainer, InputError } from '../../styles/ui/input';
import { Label } from '../../styles/ui/label';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '../../schemas/userSchema';
import { useState } from 'react';
import { FetchUserResponse } from '../../interfaces/fetches';
import ModalError from './ModalError';
import { ContainerLoading, Loader } from '../../styles/ui/loading';

interface Props {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
}

const ModalWriteUser = ({ isOpen, user, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name || '',
      lastName: user?.lastName || '',
      username: user?.username || '',
      email: user?.email || '',
      phone: user?.phone || '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const onSubmit = async (data: FieldValues) => {
    const url = user ? `/api/users/${user.id.$oid}/update` : '/api/users/create';
    try {
      setIsLoading(true);

      const response = await fetch(`http://localhost:3000${url}`, {
        method: user ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const res: FetchUserResponse = await response.json();

      if (res.status !== 200) {
        throw new Error(res.message);
      }

      reset();
      onClose();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ModalOverlay $isOpen={isOpen}>
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          {/* Header */}
          <ModalUserLayout>
            <ModalUserProfile>Perfil</ModalUserProfile>

            {user ? (
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Button
                  $backgroundColor="#FFF"
                  $color="#262D34"
                  $border="1px solid #262D34"
                  $padding="7px 9px"
                  $hoverBackgroundColor="#F9FBFF"
                  $hoverColor="#262D34"
                  $hoverPadding="6.5px 8.5px"
                  onClick={onClose}
                  disabled={isLoading}
                >
                  Cancelar edición
                </Button>
                {isLoading ? (
                  <ContainerLoading>
                    <Loader />
                  </ContainerLoading>
                ) : (
                  <Button type="submit" disabled={isLoading}>
                    Guardar
                  </Button>
                )}
              </div>
            ) : isLoading ? (
              <ContainerLoading>
                <Loader />
              </ContainerLoading>
            ) : (
              <Button type="submit" disabled={isLoading}>
                Crear estudiante
              </Button>
            )}
          </ModalUserLayout>

          {/* Body */}
          <DivFormContainer>
            {/* Nombre */}

            <FormItem>
              <Label htmlFor="name">Nombre</Label>
              <InputContainer>
                <Input id="name" type="text" {...register('name')} />

                <div>
                  {errors.name && (
                    <InputError>{errors.name.message as string}</InputError>
                  )}
                </div>
              </InputContainer>
            </FormItem>

            {/* Apellidos */}
            <FormItem>
              <Label htmlFor="lastName">Apellidos</Label>
              <InputContainer>
                <Input id="lastName" type="text" {...register('lastName')} />
                <div>
                  {errors.lastName && (
                    <InputError>{errors.lastName.message as string}</InputError>
                  )}
                </div>
              </InputContainer>
            </FormItem>

            {/* Nombre de usuario */}
            <FormItem>
              <Label htmlFor="username">Nombre de usuario</Label>
              <InputContainer>
                <Input id="username" type="text" {...register('username')} />
                <div>
                  {errors.username && (
                    <InputError>{errors.username.message as string}</InputError>
                  )}
                </div>
              </InputContainer>
            </FormItem>

            {/* Email */}
            <FormItem>
              <Label htmlFor="email">Email</Label>
              <InputContainer>
                <Input id="email" type="email" {...register('email')} />
                <div>
                  {errors.email && (
                    <InputError>{errors.email.message as string}</InputError>
                  )}
                </div>
              </InputContainer>
            </FormItem>

            {/* Móvil */}
            <FormItem>
              <Label htmlFor="phone">Móvil</Label>
              <InputContainer>
                <Input id="phone" type="text" {...register('phone')} />
                <div>
                  {errors.phone && (
                    <InputError>{errors.phone.message as string}</InputError>
                  )}
                </div>
              </InputContainer>
            </FormItem>
          </DivFormContainer>

          {/* Footer */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              $backgroundColor="#FFF"
              $color="#262D34"
              $border="1px solid #262D34"
              $hoverBackgroundColor="#F9FBFF"
              $hoverColor="#262D34"
              $hoverPadding="7.5px 9.5px"
              onClick={onClose}
            >
              Cerrar
            </Button>
          </div>
        </FormContainer>
      </ModalOverlay>

      {error && (
        <ModalError
          isOpen={!!error}
          onClose={() => setError(undefined)}
          description={error}
        />
      )}
    </>
  );
};

export default ModalWriteUser;
